# Automated support bot
A simple discord chatbot with an easy-to-use configuration. Written using discord.js


reads text from:
- text
- urls
- images

using regex you can easily determine the best matches and respond accordingly

## Examples
Example using image<br/>
![Discord_gJiwXFIPkr](https://user-images.githubusercontent.com/45005889/138361646-7544ec8f-aec7-4d69-a0ad-71d63c0ac218.png) <br/> <br/>

Example using url <br/>
![Discord_CUr0VvM8Rf](https://user-images.githubusercontent.com/45005889/138349727-23e437e7-d8a9-40dc-928d-1bdaec95f051.png)<br/> <br/>
Example response config
```js
responses : [
    {
        key : /^(?=.*hello)(?=.*world).*$/mgi, //match any string that includes both the words: hello and world
        content : `Hello World!` //respond with Hello World!
    }
 ]
 ```

## Requirements
[Node](https://nodejs.org/en/) version `^16` <br />
Npm 

## Usage
Rename the [config.example.js](config.example.js) to `config.js` and 
configure the options to your needs and add as many responses as you like ;)

install packages `npm install` <br/>
start the bot `npm start`

## Donating
Are you enjoying the smart-support-bot? Feeling generous? Well, help me purchase pizza to continue working on the bot an without empty stomach!

Your donations go a long way in helping me develop this bot, but please don't feel obligated to.

Ko-fi link: https://ko-fi.com/avmg20 Please notify me when you've donated so I can respond quicker :) AVMG#1234
