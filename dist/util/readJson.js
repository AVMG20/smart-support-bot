"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJson = void 0;
var fs_1 = __importDefault(require("fs"));
function readJson(path) {
    var data = fs_1.default.readFileSync(path, 'utf8');
    return JSON.parse(data);
}
exports.readJson = readJson;
