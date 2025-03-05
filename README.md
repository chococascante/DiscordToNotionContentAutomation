Here's the updated README incorporating your feedback:

- **Clarified that the easiest way to test the Discord bot is to give it admin permissions but recommends reducing privileges afterward.**
- **Corrected the `contentGenerationPrompt` explanation, specifying that it's a file (`src/prompts/contentGenerationPrompt.md`) instead of a Notion field.**

---

# DiscordToNotionContentAutomation

This project automates the process of capturing ideas from a specific Discord channel, adding them to Notion, generating content using ChatGPT, and storing the generated content back in Notion.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
    - [Running in Production](#running-in-production)
    - [Local Development](#local-development)
- [API Keys and Tokens](#api-keys-and-tokens)
- [Prompt Storage](#prompt-storage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Discord Integration**: Monitors a designated Discord channel for new messages.
- **Notion Integration**: Adds captured ideas to a Notion database.
- **ChatGPT Integration**: Sends prompts to ChatGPT based on the captured ideas and retrieves generated content.
- **Automated Workflow**: Seamlessly integrates the above functionalities to create an automated content creation pipeline.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 14.x or higher.
- **npm**: Comes with Node.js; ensure it's up to date.
- **Discord Bot Token**: Required to access the Discord API.
- **Notion Integration Token**: Needed to interact with the Notion API.
- **OpenAI API Key**: To access ChatGPT functionalities.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/chococascante/DiscordToNotionContentAutomation.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd DiscordToNotionContentAutomation
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

## Configuration

1. **Create a `.env` file** in the root directory.

2. **Add the following environment variables** to the `.env` file:

   ```env
   DISCORD_TOKEN=your_discord_bot_token
   NOTION_TOKEN=your_notion_integration_token
   OPENAI_API_KEY=your_openai_api_key
   NOTION_DATABASE_ID=your_notion_database_id
   DISCORD_CHANNEL_ID=your_discord_channel_id
   ```

   Replace `your_discord_bot_token`, `your_notion_integration_token`, `your_openai_api_key`, `your_notion_database_id`, and `your_discord_channel_id` with your actual credentials and IDs.

## Usage

### Running in Production

To run the bot normally:

```bash
npm start
```

This will start the bot and allow it to monitor messages, store ideas in Notion, and generate content.

### Local Development

For local development, you can use **nodemon** to automatically restart the bot when changes are detected:

```bash
npm run dev
```

This will run the bot with hot-reloading, making development and testing more efficient.

---

## API Keys and Tokens

### 1. **Getting the Discord Bot Token**
To get your Discord bot token:
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** → Name your bot.
3. Go to **Bot** (left sidebar) → Click **Add Bot**.
4. Copy the **Token** under the **Click to Reveal Token** section.
5. Enable **Privileged Gateway Intents** (under "Bot" settings).
6. **Invite the bot to your server**:
    - Go to **OAuth2** → **URL Generator**.
    - Select `bot` scope and grant necessary permissions.
    - **Easiest way to test**: Assign **Administrator** permissions to the bot. However, this gives full access to the server, so it should only be used temporarily for testing.
        - Once the bot is working, **remove admin and grant only the necessary permissions** to limit its access.

### 2. **Getting the Notion API Token**
To get a Notion integration token:
1. Go to [Notion Developers](https://www.notion.so/my-integrations).
2. Click **New Integration** and name it.
3. Select the workspace where the integration will be used.
4. Copy the **Internal Integration Token**.
5. Share access with your database:
    - Open your Notion database.
    - Click **Share** → Select your integration.

### 3. **Getting the OpenAI API Key**
To get an OpenAI API key:
1. Go to [OpenAI API Keys](https://platform.openai.com/account/api-keys).
2. Click **Create API Key**.
3. Copy the key and store it securely.

---

## Prompt Storage

When storing prompts for ChatGPT, the bot reads from a file located at:

```
src/prompts/contentGenerationPrompt.md
```

### **How to Edit the Prompt**
Modify the `contentGenerationPrompt.md` file to customize the type of content ChatGPT generates.

### **Example Prompt in Markdown**
```markdown
## Content Idea
Write a YouTube script about "Why JavaScript is Weird."

### Instructions:
- Keep it humorous and engaging.
- Use real-world examples.
- End with a call to action.
```
Using Markdown formatting ensures that ChatGPT receives a well-structured prompt, improving the quality of the generated content.

---

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**.

2. **Create a new branch**:

   ```bash
   git checkout -b feature/your_feature_name
   ```

3. **Make your changes**.

4. **Commit your changes**:

   ```bash
   git commit -m 'Add some feature'
   ```

5. **Push to the branch**:

   ```bash
   git push origin feature/your_feature_name
   ```

6. **Open a pull request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Notion API](https://developers.notion.com/)
- [Discord.js](https://discord.js.org/)
- [OpenAI API](https://platform.openai.com/docs/)
