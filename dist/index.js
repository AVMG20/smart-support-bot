"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var assertActivityType_js_1 = require("./util/assertActivityType.js");
var MessageReader_js_1 = require("./message/MessageReader.js");
var readJson_js_1 = require("./util/readJson.js");
var MessageMatcher_js_1 = require("./message/MessageMatcher.js");
/** --- Declare constants --- */
var path = require('path');
// Create a new client instance
var client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent] });
// Import config using fs
var settings = (0, readJson_js_1.readJson)(path.join(__dirname, '/../config.json'));
// Import responses using fs
var responses = (0, readJson_js_1.readJson)(path.join(__dirname, '/../responses.json'));
// Create a new message reader instance
var messageReader = new MessageReader_js_1.MessageReader({
    urls: settings.urls,
    images: settings.images,
    debug: settings.debug
});
// Create a new message matcher instance
var messageMatcher = new MessageMatcher_js_1.MessageMatcher(responses);
/** --- Bot events --- */
// When the client is ready, run this code (only once)
client.once('ready', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: 
            // @ts-ignore
            return [4 /*yield*/, ((_a = client.user) === null || _a === void 0 ? void 0 : _a.setActivity(settings.bot.activity_message, { type: (0, assertActivityType_js_1.assertActivityType)(settings.bot.activity) }))];
            case 1:
                // @ts-ignore
                _c.sent();
                return [4 /*yield*/, ((_b = client.user) === null || _b === void 0 ? void 0 : _b.setStatus(settings.bot.activity_status))];
            case 2:
                _c.sent();
                console.log('Smart-Support-bot is ready!');
                console.log("".concat(responses.length, " responses loaded!"));
                return [2 /*return*/];
        }
    });
}); });
// Listen for messages
client.on('messageCreate', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var content, response, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Ignore messages from bots and messages that are not in the support channels
                if (message.author.bot || !settings.support_channels.includes(message.channelId))
                    return [2 /*return*/];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, messageReader.read(message)];
            case 2:
                content = _a.sent();
                console.log('[BOT] received message: ' + content.replace(/\n/g, ' ').slice(0, 50) + (content.length > 50 ? '...' : ''));
                response = messageMatcher.match(content);
                if (!response)
                    return [2 /*return*/];
                // Send the response
                return [4 /*yield*/, message.reply(response)];
            case 3:
                // Send the response
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                if (settings.debug)
                    console.error(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Login to Discord with your client's token
client.login(settings.token);
