module.exports = {
    token: 'YOUR_BOT_TOKEN',

    // check discord.js docs on valid bot properties
    // https://discordjs.guide/popular-topics/faq.html#how-do-i-check-if-a-guild-member-has-a-specific-role
    bot: {
        activity: 'PLAYING',
        activity_message: 'Smart Support',
        activity_status: 'online',
    },

    //the channels the bot is allowed to use
    support_channels: [ //channel ids
        '896300470971285521'
    ],

    //configured allowed urls
    urls: {
        allowed_urls: [
            'https://pastebin.com',
            'https://termbin.com'
        ],
        max_content_size_in_bytes: 314572, //0.3mb
    },

    //configure image parsing
    images: {
        max_size_in_bytes: 314572, //0.3mb
        parse_language: 'eng',
        message_reaction: '👀'
    },
}
