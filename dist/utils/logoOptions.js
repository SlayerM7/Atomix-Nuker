"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoOptions = void 0;
const chalk_1 = require("chalk");
const getTheme_1 = require("./getTheme");
const logo_1 = require("./logo");
function logoOptions(db) {
    let mainColor = getTheme_1.getTheme(db);
    logo_1.logo(db);
    console.log(mainColor("[") +
        chalk_1.white(1) +
        mainColor("] ") +
        chalk_1.white("Wizz            ") +
        mainColor("[") +
        chalk_1.white(2) +
        mainColor("] ") +
        chalk_1.white("Scrape"));
    console.log(mainColor("[") +
        chalk_1.white("x") +
        mainColor("] ") +
        chalk_1.white("Change theme    ") +
        mainColor("[") +
        chalk_1.white("c") +
        mainColor("] ") +
        chalk_1.white("Exit"));
    console.log(mainColor("[") +
        chalk_1.white("v") +
        mainColor("] ") +
        chalk_1.white("Config          ") +
        mainColor("[") +
        chalk_1.white("z") +
        mainColor("] ") +
        chalk_1.white("Credits"));
    console.log(" ");
    console.log(" ");
}
exports.logoOptions = logoOptions;
