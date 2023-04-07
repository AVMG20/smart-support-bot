"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertActivityType = void 0;
var SettingsInterface_1 = require("../interface/SettingsInterface");
function assertActivityType(value) {
    if (!Object.values(SettingsInterface_1.ActivityType).includes(value)) {
        throw new Error("Invalid activity type: ".concat(value));
    }
    return value;
}
exports.assertActivityType = assertActivityType;
