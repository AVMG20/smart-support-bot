import {Attachment, Message} from "discord.js";
import Tesseract from 'tesseract.js';
import axios from 'axios';

export interface MessageReaderConfig {
    urls: {
        allowed_urls: string[]; // This is a list of allowed urls that can be read from
        max_content_size_in_bytes: number; // This is the max size of the content that can be read from a url
    };

    images: {
        max_size_in_bytes: number; // This is the max size of the image that can be read from
        parse_language: string; // This is the language that the image will be parsed in
        message_reaction: string; // This is the reaction that will be added to the message while it is being parsed
    }

    debug: boolean; // This is a boolean that determines if debug messages should be shown
}

export class MessageReader {
    protected config: MessageReaderConfig;
    protected urlExpression: RegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/mg;

    /**
     * @param {MessageReaderConfig} config
     */
    constructor(config: MessageReaderConfig) {
        this.config = config;
    }

    /**
     * @description Determine the content of the message
     * @param message
     */
    public async read(message: Message): Promise<string> {
        return new Promise(async (resolve, reject) => {

            // Check if message is an URL
            if (this.config.urls.allowed_urls.findIndex(url => message.content.startsWith(url)) !== -1) {

                // Check if URL is allowed
                if (message.content.match(this.urlExpression)) {

                    // Parse URL to text
                    return this._parseUrl(message)
                        .then(resolve)
                        .catch(reject);
                }

                // URL is not allowed
                return reject('URL not allowed: ' + message.content);
            } else {
                this._debug('URL not in allowed urls list');
            }


            // Check if message has an image
            if (message.attachments.size > 0) {

                // Check if attachment is an image
                let attachment = message.attachments.first();

                // Check if attachment is an image and is not too large
                if (attachment && attachment.size < this.config.images.max_size_in_bytes && this._attachIsImage(attachment)) {

                    // Parse image to text
                    return this._parseImage(message)
                        .then(resolve)
                        .catch(reject);
                }

                // Attachment is not an image or is too large
                return reject(`Attachment is not an image or is too large: ${attachment?.url} (${attachment?.size} bytes)`);
            } else {
                this._debug(`No attachment found.`);
            }

            // Treat message as regular text message
            return resolve(message.content);
        });
    }

    /**
     * @description Parse the content of an image to text
     * @param message
     * @protected
     */
    protected _parseImage(message: Message): Promise<string> {
        return new Promise(async (resolve, reject) => {
            //add reaction to message to show that it is being parsed
            await message.react(this.config.images.message_reaction);

            //check if there is an attachment
            let attach = message.attachments.first();
            if (!attach?.url) return reject('No attachment found');

            //read the image
            let response = await Tesseract.recognize(attach.url, this.config.images.parse_language);

            //remove the reaction
            await message.reactions.removeAll();

            this._debug('IMAGE TEXT: ' + response.data.text)

            return resolve(response.data.text);
        });
    }

    /**
     * @description Parse the content of an url
     * @param message
     * @protected
     */
    protected _parseUrl(message: Message): Promise<string> {
        return new Promise(async (resolve, reject) => {
            // Check if URL content is not too large
            if (message.content.length > this.config.urls.max_content_size_in_bytes) {
                return reject('URL content is too large');
            }

            // Read URL content
            let response = await axios.get(message.content).catch(reject);

            // Check if URL content is not empty
            if (response && response.data) {
                this._debug('URL TEXT: ' + response.data);
                return resolve(response.data);
            }

            // URL content is empty
            return reject('URL content is empty');
        });
    }

    /**
     * @description Check if message attachment is an image
     * @param attachment
     * @protected
     */
    protected _attachIsImage(attachment: Attachment): boolean {
        return attachment?.url.match(/\.(jpeg|jpg|png)$/) != null;
    }

    /**
     * @description Log a message if debug is enabled
     * @param message
     * @protected
     */
    protected _debug(message: string) {
        if (this.config.debug) {
            console.log(message);
        }
    }
}
