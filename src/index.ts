import {Client, GatewayIntentBits, Message, PresenceStatusData} from 'discord.js';
import {assertActivityType} from "./util/assertActivityType.js";
import {MessageReader, MessageReaderConfig} from "./message/MessageReader.js";
import {SettingsInterface} from "./interface/SettingsInterface";
import {readJson} from "./util/readJson.js";
import {MessageMatcher} from "./message/MessageMatcher.js";
import {ResponseInterface} from "./interface/ResponseInterface";

/** --- Declare constants --- */

const path = require('path');
// Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

// Import config using fs
const settings = readJson(path.join(__dirname, '/../config.json')) as SettingsInterface;
// Import responses using fs
let responses = readJson(path.join(__dirname, '/../responses.json')) as ResponseInterface[];

// Create a new message reader instance
const messageReader = new MessageReader({
    urls: settings.urls,
    images: settings.images,
    debug: settings.debug
} as MessageReaderConfig);

// Create a new message matcher instance
const messageMatcher = new MessageMatcher(responses);

/** --- Bot events --- */

// When the client is ready, run this code (only once)
client.once('ready', async () => {
    // @ts-ignore
    await client.user?.setActivity(settings.bot.activity_message, {type: assertActivityType(settings.bot.activity)});
    await client.user?.setStatus(<PresenceStatusData>settings.bot.activity_status);

    console.log('Smart-Support-bot is ready!');
    console.log(`${responses.length} responses loaded!`);
});

// Listen for messages
client.on('messageCreate', async (message) => {

    // Ignore messages that should not be responded to
    if (!botShouldRespond(message)) return;

    try {
        // Read the message
        let content = await messageReader.read(message)
        console.log('[BOT] received message: ' + content.replace(/\n/g, ' ').slice(0, 50) + (content.length > 50 ? '...' : ''));

        // Match the message against the responses
        let response = messageMatcher.match(content);
        if (!response) return;

        // Send the response
        await message.reply(response);
    } catch (e) {
        if (settings.debug) console.error(e);
    }
});

// Login to Discord with your client's token
client.login(settings.token);

/** --- Helper functions --- */

const botShouldRespond = (message: Message): boolean => {
    // Ignore messages from bots
    if (message.author.bot) return false;

    // Ignore messages that are not in the support channels
    if (!settings.support_channels.includes(message.channelId)) return false;

    // Ignore messages that are from users with excluded roles
    if (message.member?.roles.cache.some(role => settings.excluded_roles.includes(role.id))) return false;

    return true;
}

