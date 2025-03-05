import OpenAI from 'openai';
import {readMarkdownFile} from "../utils/readMarkdownFile";

export class OpenAIService {

    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async generateIdeaContent(idea: string): Promise<string | null> {
        try {
            const prompt = await readMarkdownFile('src/prompts/contentGenerationPrompt.md');
            const completion = await this.openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "developer", content: prompt },
                    {
                        role: "user",
                        content: idea,
                    },
                ],
                store: true,
            });
            return completion.choices[0].message.content;
        } catch (error) {
            throw new Error(`Error al generar contenido con OpenAI: ${error}`);
        }
    }
}