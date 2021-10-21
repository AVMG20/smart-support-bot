const {Message} = require('discord.js')

/**
 * @param {Message} message
 * @param response
 */
module.exports = (message, response) => {
    return new Promise(async (resolve, reject) => {
        await message.reply(response.content).catch(reject)
        resolve(message)
    })
}
