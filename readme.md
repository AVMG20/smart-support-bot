An easy-to-use Discord chatbot that automatically responds to messages, including text inside images and URLs. This bot
is designed to assist with FAQs and can be configured to suit your specific needs. It's built using discord.js.

The bot can read text from:

- Text messages
- URLs
- Images

## **Requirements**

- **[Node](https://nodejs.org/en/)** version **`^16`**
- npm

## **Usage**

1. Configure the options according to your needs and add as many responses as desired.
2. Install packages: **`npm install`**
3. Start the bot: **`npm start`**

## **Example Response Configurations**

The bot uses regex to find matches in messages and responds with the specified content. Here are some simple examples to
help you get started:

### Example using image

![https://user-images.githubusercontent.com/45005889/138361646-7544ec8f-aec7-4d69-a0ad-71d63c0ac218.png](https://user-images.githubusercontent.com/45005889/138361646-7544ec8f-aec7-4d69-a0ad-71d63c0ac218.png)

### Example using url

![https://user-images.githubusercontent.com/45005889/138349727-23e437e7-d8a9-40dc-928d-1bdaec95f051.png](https://user-images.githubusercontent.com/45005889/138349727-23e437e7-d8a9-40dc-928d-1bdaec95f051.png)

### **Example 1: Simple Keyword Match**

```jsx
responses: [
    {
        key: /help/i, // Match any string containing the word "help" (case insensitive)
        content: "Need assistance? Visit our support page at https://www.example.com/support"
    }
]
```

### **Example 2: Multiple Keywords Match**

```jsx
responses: [
    {
        key: /\b(hello|hi|hey)\b/i, // Match any string containing the words "hello", "hi", or "hey" (case insensitive)
        content: "Hello there! How can I help you today?"
    }
]
```

### **Example 3: Match and Respond with a Captured Group**

```jsx
responses: [
    {
        key: /my name is (\w+)/i, // Match any string containing "my name is" followed by a single word (case insensitive)
        content: "Nice to meet you! How can I help you today?"
    }
]
```

### **Example 4: Advanced Match with Multiple Keywords**

```jsx
responses: [
    {
        key: /^(?=.*hello)(?=.*world).*$/mgi, // Match any string that includes both the words "hello" and "world"
        content: "Hello World!" // Respond with "Hello World!"
    }
]
```

## **Configuring the Bot**

To configure the bot, you need to modify the **`config.json`** file. Here's an example of the **`config.json`** file and
an explanation of its contents:

```json
{
  "token": "BOT TOKEN HERE",
  "bot": {
    "activity": "PLAYING",
    "activity_message": "Smart Support",
    "activity_status": "online"
  },
  "support_channels": [
    "CHANNEL IDS HERE"
  ],
  "excluded_roles": [
    "ROLE IDS HERE"
  ],
  "urls": {
    "allowed_urls": [
      "https://pastebin.com",
      "https://termbin.com"
    ],
    "max_content_size_in_bytes": 314572
  },
  "images": {
    "max_size_in_bytes": 524288,
    "parse_language": "eng",
    "message_reaction": "\uD83D\uDC40"
  },
  "debug": false
}
```

- **`"token"`**: Replace **`"BOT TOKEN HERE"`** with your bot's token.
- **`"bot"`**: Configure the bot's activity type, message, and status.
    - **`"activity"`**: Set the activity type (e.g., **`"PLAYING"`**, **`"STREAMING"`**, **`"LISTENING"`**, *
      ***`"WATCHING"`***, or **`"COMPETING"`**).
    - **`"activity_message"`**: Set a custom message for the bot's status.
    - **`"activity_status"`**: Set the bot's online status (e.g., **`"online"`**, **`"idle"`**, **`"dnd"`** or *
      ***`"invisible"`***).
- **`"support_channels"`**: Replace **`"CHANNEL IDS HERE"`** with an array of channel IDs where the bot should operate.
- **`"excluded_roles"`**: Replace **`"ROLE IDS HERE"`** with an array of role IDs that should be excluded from bot reactions.
- **`"urls"`**: Configure URL handling options.
      - **`"allowed_urls"`**: Add an array of allowed URLs to parse.
      - **`"max_content_size_in_bytes"`**: Set the maximum content size for URLs.
- **`"images"`**: Configure image handling options.
      - **`"max_size_in_bytes"`**: Set the maximum image size for parsing.
      - **`"parse_language"`**: Set the language used for parsing images.
      - **`"message_reaction"`**: Set the reaction to add to messages with images.
- **`"debug"`**: Set to **`true`** to enable extra debug messages.

## **Configuring Responses**

To configure responses, modify the **`responses.json`**. The responses are stored as an array of objects, each
containing a regex **`key`** and a **`content`** value.

Here's an example of a **`responses.json`** file:

```json
[
  {
    "key": "how\\s*(?:can|do)\\s*i\\s*reset\\s*my\\s*password",
    "content": "To reset your password, follow this link: https://example.com/reset-password"
  },
  {
    "key": "what\\s*are\\s*the\\s*server\\s*rules",
    "content": "Our server rules are: 1) Be respectful, 2) No spamming, 3) Keep content in appropriate channels."
  }
]
```

In this example, the bot will respond with the provided **`content`** when a user's message matches the regex pattern in
the **`key`**.

## **Privileged Gateway Intents**

Some Gateway Intents require approval if your bot is verified. If your bot is not verified, you can toggle those intents to access them. This bot requires the following intents:

### **Server Members Intent**

This intent is required for your bot to receive events listed under **`GUILD_MEMBERS`**. To enable the Server Members Intent:

1. Go to the **[Discord Developer Portal](https://discord.com/developers/applications)**.
2. Select your bot's application.
3. Navigate to the "Bot" tab on the left-hand side.
4. Under the "Privileged Gateway Intents" section, enable the "Server Members Intent" toggle.

**Note**: Once your bot reaches 100 or more servers, this will require verification and approval. **[Read more about Discord bot verification and approval here](https://support.discord.com/hc/en-us/articles/360040720412-Bot-Verification-and-Data-Whitelisting)**.

### **Message Content Intent**

This intent is required for your bot to receive message content in most messages. To enable the Message Content Intent:

1. Follow steps 1-3 from the "Server Members Intent" section above.
2. Under the "Privileged Gateway Intents" section, enable the "Message Content Intent" toggle.

**Note**: Once your bot reaches 100 or more servers, this will require verification and approval. **[Read more about Discord bot verification and approval here](https://support.discord.com/hc/en-us/articles/360040720412-Bot-Verification-and-Data-Whitelisting)**.

## **Bot Permissions**

This bot also needs to be able to read, write, and reply to messages. Ensure that the bot has access and the necessary permissions to the configured channels. To do this:

1. Go to your Discord server and navigate to the desired channel.
2. Right-click on the channel and select "Edit Channel."
3. Navigate to the "Permissions" tab.
4. Click on the "+" button to add a new role or member.
5. Search for your bot's name and select it.
6. Grant the required permissions, such as "Read Messages", "Send Messages", and "Add Reactions."

By following these steps, you'll ensure that the bot has the necessary permissions to function properly in the configured channels.

## **Donating**

Are you enjoying the smart-support-bot? Feeling generous? Help me purchase pizza to continue working on the bot without
an empty stomach!

Your donations go a long way in helping me develop this bot, but please don't feel obligated to.

Ko-fi link: **[https://ko-fi.com/avmg20](https://ko-fi.com/avmg20)** Please notify me when you've donated so I can
respond quicker :) AVMG#1234