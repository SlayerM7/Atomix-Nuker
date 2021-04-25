"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configLogo = void 0;
const chalk_1 = require("chalk");
const getTheme_1 = require("../getTheme");
const logo_1 = require("../logo");
function configLogo(db) {
    let mainColor = getTheme_1.getTheme(db);
    logo_1.logo(db);
    console.log(mainColor("[") +
        chalk_1.white(1) +
        mainColor("] ") +
        chalk_1.white("Nuke settings         ") +
        mainColor("[") +
        chalk_1.white(2) +
        mainColor("] ") +
        chalk_1.white("Scrape settings"));
    // console.log(
    //   mainColor("[") + white(3) + mainColor("] ") + white("Data saved         ")
    //   //+
    //   // mainColor("[") +
    //   // white(2) +
    //   // mainColor("] ") +
    //   // white("Scrape settings")
    // );
    //   console.log(
    //     mainColor("[") +
    //       white("x") +
    //       mainColor("] ") +
    //       white("Change theme    ") +
    //       mainColor("[") +
    //       white("c") +
    //       mainColor("] ") +
    //       white("Exit")
    //   );
    //   console.log(
    //     mainColor("[") +
    //       white("v") +
    //       mainColor("] ") +
    //       white("Config    ") +
    //       mainColor("[") +
    //       white("z") +
    //       mainColor("] ") +
    //       white("Credits")
    //   );
    console.log(" ");
    console.log(" ");
}
exports.configLogo = configLogo;
