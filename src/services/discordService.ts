import {
    Client,
    GatewayIntentBits,
    OmitPartialGroupDMChannel,
    Message,

} from "discord.js";
import {NotionService} from "./notionService";
import {OpenAIService} from "./openAIService";

export class DiscordService {
    private readonly discordToken: string = process.env.DISCORD_TOKEN ?? "";
    private readonly watchedChannelID: string = process.env.WATCHED_CHANNEL_ID ?? "";
    private client: Client;
    private notionService: NotionService;
    private openAIService: OpenAIService;

    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent,
            ]
        });

        this.client.on("messageCreate", this.onMessageCreated.bind(this));
        this.login();

        this.notionService = new NotionService();
        this.openAIService = new OpenAIService();
    }

    async onMessageCreated(message: OmitPartialGroupDMChannel<Message<boolean>>): Promise<void> {
        // Ignore messages from bots
        if(message.author.bot) {
            return;
        }

        // Ignore messages from other channels, only replies if "ideas-contenido" channel
        if(message.channelId === this.watchedChannelID) {
            try {
                // Save the idea in Notion
                const notionResponse = await this.notionService.generateIdeaContent(message.content);
                // @ts-expect-error URL is not defined in the response type
                message.channel.send(`Idea guardada en Notion: ${notionResponse.url}`);

                // Generate content with OpenAI
                const openAIResponse = await this.openAIService.generateIdeaContent(message.content);
                console.log("Respuesta de openAI",openAIResponse);
                if(!openAIResponse) {
                    message.channel.send("No se pudo generar contenido con OpenAI");
                    return;
                }
                // Update the Notion page with the generated content
                await this.notionService.updateIdeaContent(notionResponse.id, openAIResponse);
                // @ts-expect-error URL is not defined in the response type
                message.channel.send(`Contenido generado y guardado en Notion: ${notionResponse.url}`);

            } catch (error) {
                console.error(error);
            }
        }
    }

    async login(): Promise<void> {
        this.client.login(this.discordToken).then(() => {
            console.log("Bot is ready");
        }).catch((err) => {
            console.error(err);
        });
    }
}
