"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nukeSettingsLogo = void 0;
const chalk_1 = require("chalk");
const getTheme_1 = require("../getTheme");
function nukeSettingsLogo(db) {
    let mainColor = getTheme_1.getTheme(db);
    console.log(mainColor("[") +
        chalk_1.white(1) +
        mainColor("] ") +
        chalk_1.white("Always use old            ") +
        mainColor("[") +
        chalk_1.white(2) +
        mainColor("] ") +
        chalk_1.white("Always set new"));
}
exports.nukeSettingsLogo = nukeSettingsLogo;
