require('dotenv').config()

module.exports = {
    token: 'YOUR_BOT_TOKEN',

    bot: { // https://discordjs.guide/popular-topics/faq.html#how-do-i-check-if-a-guild-member-has-a-specific-role
        activity: 'PLAYING',
        activity_message: 'Smart Support',
        activity_status: 'online',
    },

    //configured allowed urls
    urls : {
        allowed_urls: [
            'https://hastebin.com'
        ],
        max_content_size_in_bytes: 1048576, //1mb
    },

    //configure image parsing
    images : {
        max_size_in_bytes : 1048576, //1mb
        parse_language : 'eng'
    },

    //all keys have to be valid regex
    responses : [
        {
            key : /^(?=.*hello)(?=.*world).*$/mgi,
            content : `Hello World!`
        },
    ]
}
