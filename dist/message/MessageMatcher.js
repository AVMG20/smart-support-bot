"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageMatcher = void 0;
var regex_parser_1 = __importDefault(require("regex-parser"));
var MessageMatcher = /** @class */ (function () {
    function MessageMatcher(responses) {
        this.responses = responses.map(function (response) {
            return {
                key: (0, regex_parser_1.default)(response.key),
                content: response.content
            };
        });
    }
    /**
     * @description Match a message against the responses
     * @param message
     */
    MessageMatcher.prototype.match = function (message) {
        var match = this.responses.findIndex(function (response) { return message.match(response.key); });
        return match !== -1 ? this.responses[match].content : null;
    };
    return MessageMatcher;
}());
exports.MessageMatcher = MessageMatcher;
