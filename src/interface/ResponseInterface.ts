export interface ResponseInterface {
    key: string | RegExp; // regex string to match against
    content: string; // response to send when key is matched
}

