const {Message, MessageAttachment} = require('discord.js')
const Tesseract = require('tesseract.js')
const axios = require('axios');
const {urls, images} = require('../config')
const RegexParser = require("regex-parser");
const urlExpression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/mg

class ContentValidator {
    /**
     * @param {array} responses
     */
    constructor(responses) {
        this.responses = responses.map(response => {
            return {
                key : RegexParser(response.key),
                content : response.content
            }
        })
    }

    /**
     * @description determine the content of the message
     * @param {Message} message
     * @return {Promise<{key: RegExp, content: string}|null>}
     */
    validateContent(message) {
        return new Promise(async (resolve, reject) => {
            //check if message is url
            if (urls.allowed_urls.findIndex(url => message.content.startsWith(url)) !== -1) {
                if (message.content.match(urlExpression)) {
                    let text = await this.parseUrl(message).catch(reject);
                    return resolve(this.checkMatches(text));
                }
            }

            //check if message has image
            if (message.attachments.size > 0) {
                let attachment = message.attachments.first()
                if (attachment.size < images.max_size_in_bytes && this.attachIsImage(attachment)) {
                    let text = await this.parseImage(message).catch(reject)
                    return resolve(this.checkMatches(text));
                }
            }

            //treat message as regular text message
            return resolve(this.checkMatches(message.content))
        })
    }

    /**
     * @description check if message attachment is an image
     * @param {MessageAttachment} msgAttach
     */
    attachIsImage(msgAttach) {
        let url = msgAttach.url;
        return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
    }

    /**
     * @description parse image to text, using tesseract
     * @param {Message} message
     * @return {Promise<string>}
     */
    parseImage(message) {
        let attachment = message.attachments.first()

        return new Promise(async (resolve, reject) => {
            console.log('[PARSER] parsing image to text.')
            await message.react(images.message_reaction)

            await Tesseract.recognize(attachment.url, images.parse_language)
                .then(async ({data: {text}}) => {
                    await message.reactions.removeAll()
                    return resolve(text)
                })
                .catch(reject)
        })

    }

    /**
     * @param {Message} message
     * @return {Promise<string>}
     */
    parseUrl(message) {
        console.log('[PARSER] parsing url to text.')
        return new Promise(async (resolve, reject) => {
            let response = await axios.get(message.content, {
                maxContentLength: urls.max_content_size_in_bytes
            }).catch(reject)

            typeof response.data == 'string'
                ? resolve(response.data)
                : reject(new Error('response data is not a string'))
        })
    }

    /**
     * @description search for a match in the provided text, return the response or null
     * @param {string} text
     * @return {{key: RegExp, content: string}|null}
     */
    checkMatches(text) {
        console.log('[PARSER] text: \n' + text)
        let index = this.responses.findIndex(response => text.match(response.key))

        if (index !== -1) {
            console.log('[PARSER] match found!')
            return this.responses[index];
        } else {
            console.log('[PARSER] no match found.')
            return null;
        }
    }
}


module.exports = ContentValidator;
