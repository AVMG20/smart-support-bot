import {ResponseInterface} from "../interface/ResponseInterface";
import RegexParser from 'regex-parser';

export class MessageMatcher {
    protected responses: ResponseInterface[];

    constructor(responses: ResponseInterface[]) {
        this.responses = responses.map(response => {
            return {
                key: RegexParser(<string>response.key),
                content: response.content
            }
        })
    }

    /**
     * @description Match a message against the responses
     * @param message
     */
    public match(message: string): string | null {
        let match = this.responses.findIndex(response => message.match(response.key))
        return match !== -1 ? this.responses[match].content : null;
    }
}