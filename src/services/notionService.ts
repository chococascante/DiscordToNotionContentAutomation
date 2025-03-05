import { Client} from "@notionhq/client";
import {
    markdownToBlocks
} from '@tryfabric/martian';
import {CreatePageResponse} from "@notionhq/client/build/src/api-endpoints";

export class NotionService {

    private notionClient: Client;

    constructor() {
        if(!process.env.NOTION_API_KEY) {
            console.error("Notion API key is missing");
        }
        this.notionClient = new Client({
            auth: process.env.NOTION_API_KEY,
        });
    }

    async generateIdeaContent(idea: string): Promise<CreatePageResponse> {
        const contentDatabaseId = process.env.NOTION_CONTENT_DATABASE_ID;
        if (!contentDatabaseId) {
            throw new Error("Notion database id is missing")
        }
        try {
            return await this.notionClient.pages.create({
                parent: {
                    database_id: contentDatabaseId
                },
                properties: {
                    'title': {
                        type: "title",
                        title: [
                            {
                                type: "text",
                                text: {
                                    content: idea,
                                }
                            }
                        ]
                    }
                }
            });
        }
        catch (error) {
            throw new Error(`Error al guardar la idea en notion: ${error}`);
        }
    }

    async updateIdeaContent(pageId: string, content: string): Promise<string> {
        try {
            // Convertir markdown a bloques de Notion
            const blocks = markdownToBlocks(content);

            // Agregar los bloques a la página usando blocks.children.append()
            await this.notionClient.blocks.children.append({
                block_id: pageId,
                // @ts-expect-error Children is not defined in the update type
                children: blocks
            });

            return `Contenido actualizado en la página ${pageId}`;
        }
    catch (error) {
            throw new Error(`Error al actualizar la idea en Notion: ${error}`);
        }
    }
}