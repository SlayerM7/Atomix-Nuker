"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeSettingsLogo = void 0;
const chalk_1 = require("chalk");
const getTheme_1 = require("../getTheme");
function scrapeSettingsLogo(db) {
    let mainColor = getTheme_1.getTheme(db);
    console.log(mainColor("[") +
        chalk_1.white(1) +
        mainColor("] ") +
        chalk_1.white("Delete after nuke         ") +
        mainColor("[") +
        chalk_1.white(2) +
        mainColor("] ") +
        chalk_1.white("Check before nuke"));
}
exports.scrapeSettingsLogo = scrapeSettingsLogo;
