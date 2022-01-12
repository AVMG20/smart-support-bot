const {Client, Intents} = require('discord.js');
const {token, bot, support_channels} = require('./config');
const responses = require('./responses.json')
const ContentValidator = require('./classes/ContentValidator')

// Create a new client instance
const contentValidator = new ContentValidator(responses);
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

// When the client is ready, run this code (only once)
client.once('ready', async () => {
    await client.user.setActivity(bot.activity_message, {type: bot.activity});
    await client.user.setStatus(bot.activity_status);

    console.log(`Found '${responses.length}' responses!`)
    console.log('Smart-Support-bot is ready! \n');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!support_channels.includes(message.channelId)) return;

    let response = await contentValidator.validateContent(message)
    if (!response) return;

    message.reply(response)
        .then(message => console.log(`[BOT] responded to '${message.attachments.size > 0 ? 'image' : message.content}'`))
        .catch(message => console.log(`[BOT] failed to respond to '${message.attachments.size > 0 ? 'image' : message.content}'`))
})


client.login(token);
