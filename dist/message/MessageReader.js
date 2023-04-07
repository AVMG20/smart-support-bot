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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageReader = void 0;
var tesseract_js_1 = __importDefault(require("tesseract.js"));
var axios_1 = __importDefault(require("axios"));
var MessageReader = /** @class */ (function () {
    /**
     * @param {MessageReaderConfig} config
     */
    function MessageReader(config) {
        this.urlExpression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/mg;
        this.config = config;
    }
    /**
     * @description Determine the content of the message
     * @param message
     */
    MessageReader.prototype.read = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var attachment;
                        return __generator(this, function (_a) {
                            // Check if message is an URL
                            if (this.config.urls.allowed_urls.findIndex(function (url) { return message.content.startsWith(url); }) !== -1) {
                                // Check if URL is allowed
                                if (message.content.match(this.urlExpression)) {
                                    // Parse URL to text
                                    return [2 /*return*/, this._parseUrl(message)
                                            .then(resolve)
                                            .catch(reject)];
                                }
                                // URL is not allowed
                                return [2 /*return*/, reject('URL not allowed: ' + message.content)];
                            }
                            else {
                                this._debug('URL not in allowed urls list');
                            }
                            // Check if message has an image
                            if (message.attachments.size > 0) {
                                attachment = message.attachments.first();
                                // Check if attachment is an image and is not too large
                                if (attachment && attachment.size < this.config.images.max_size_in_bytes && this._attachIsImage(attachment)) {
                                    // Parse image to text
                                    return [2 /*return*/, this._parseImage(message)
                                            .then(resolve)
                                            .catch(reject)];
                                }
                                // Attachment is not an image or is too large
                                return [2 /*return*/, reject("Attachment is not an image or is too large: ".concat(attachment === null || attachment === void 0 ? void 0 : attachment.url, " (").concat(attachment === null || attachment === void 0 ? void 0 : attachment.size, " bytes)"))];
                            }
                            else {
                                this._debug("No attachment found.");
                            }
                            // Treat message as regular text message
                            return [2 /*return*/, resolve(message.content)];
                        });
                    }); })];
            });
        });
    };
    /**
     * @description Parse the content of an image to text
     * @param message
     * @protected
     */
    MessageReader.prototype._parseImage = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var attach, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //add reaction to message to show that it is being parsed
                    return [4 /*yield*/, message.react(this.config.images.message_reaction)];
                    case 1:
                        //add reaction to message to show that it is being parsed
                        _a.sent();
                        attach = message.attachments.first();
                        if (!(attach === null || attach === void 0 ? void 0 : attach.url))
                            return [2 /*return*/, reject('No attachment found')];
                        return [4 /*yield*/, tesseract_js_1.default.recognize(attach.url, this.config.images.parse_language)];
                    case 2:
                        response = _a.sent();
                        //remove the reaction
                        return [4 /*yield*/, message.reactions.removeAll()];
                    case 3:
                        //remove the reaction
                        _a.sent();
                        this._debug('IMAGE TEXT: ' + response.data.text);
                        return [2 /*return*/, resolve(response.data.text)];
                }
            });
        }); });
    };
    /**
     * @description Parse the content of an url
     * @param message
     * @protected
     */
    MessageReader.prototype._parseUrl = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Check if URL content is not too large
                        if (message.content.length > this.config.urls.max_content_size_in_bytes) {
                            return [2 /*return*/, reject('URL content is too large')];
                        }
                        return [4 /*yield*/, axios_1.default.get(message.content).catch(reject)];
                    case 1:
                        response = _a.sent();
                        // Check if URL content is not empty
                        if (response && response.data) {
                            this._debug('URL TEXT: ' + response.data);
                            return [2 /*return*/, resolve(response.data)];
                        }
                        // URL content is empty
                        return [2 /*return*/, reject('URL content is empty')];
                }
            });
        }); });
    };
    /**
     * @description Check if message attachment is an image
     * @param attachment
     * @protected
     */
    MessageReader.prototype._attachIsImage = function (attachment) {
        return (attachment === null || attachment === void 0 ? void 0 : attachment.url.match(/\.(jpeg|jpg|png)$/)) != null;
    };
    /**
     * @description Log a message if debug is enabled
     * @param message
     * @protected
     */
    MessageReader.prototype._debug = function (message) {
        if (this.config.debug) {
            console.log(message);
        }
    };
    return MessageReader;
}());
exports.MessageReader = MessageReader;
