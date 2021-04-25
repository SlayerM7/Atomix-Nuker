"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const configLogo_1 = require("../utils/config/configLogo");
const nukeSettingsLogo_1 = require("../utils/config/nukeSettingsLogo");
const ScrapeSettings_1 = require("../utils/config/ScrapeSettings");
const createString_1 = require("../utils/createString");
const getTheme_1 = require("../utils/getTheme");
const logo_1 = require("../utils/logo");
const main_1 = require("./main");
function config(db, rl, client) {
    process.title = "[Atomix-Nuker] - Config";
    console.clear();
    configLogo_1.configLogo(db);
    let mainColor = getTheme_1.getTheme(db);
    rl.question(createString_1.createString("Enter option", db), (option) => {
        if (option === "1") {
            process.title = "[Atomix Nuker] - Config nuke settings";
            console.clear();
            logo_1.logo(db);
            nukeSettingsLogo_1.nukeSettingsLogo(db);
            rl.question(createString_1.createString("Enter option", db), (op) => {
                if (op === "1") {
                    rl.question(createString_1.createString("Would you like to *enable* or *disable* this", db), (enableDisable) => {
                        db.set(`settings.nuke.useold`, enableDisable === "enable" ? true : false);
                        db.save();
                        setTimeout(() => {
                            config(db, rl, client);
                        }, 2000);
                    });
                }
                else if (op === "2") {
                    rl.question(createString_1.createString("Would you like to *enable* or *disable* this", db), (enableDisable) => {
                        db.set(`settings.nuke.setnew`, enableDisable === "enable" ? true : false);
                        db.save();
                        setTimeout(() => {
                            config(db, rl, client);
                        }, 2000);
                    });
                }
            });
        }
        if (option === "2") {
            process.title = "[Atomix Nuker] - Config scrape settings";
            console.clear();
            logo_1.logo(db);
            ScrapeSettings_1.scrapeSettingsLogo(db);
            rl.question(createString_1.createString("Enter option", db), (op) => {
                if (op === "1") {
                    rl.question(createString_1.createString("Would you like to *enable* or *disable* this", db), (enableDisable) => {
                        db.set(`settings.scrape.delnuke`, enableDisable === "enable" ? true : false);
                        db.save();
                        setTimeout(() => {
                            config(db, rl, client);
                        }, 2000);
                    });
                }
                else if (op === "2") {
                    rl.question(createString_1.createString("Would you like to *enable* or *disable* this", db), (enableDisable) => {
                        db.set(`settings.scrape.checknuke`, enableDisable === "enable" ? true : false);
                        db.save();
                        setTimeout(() => {
                            config(db, rl, client);
                        }, 2000);
                    });
                }
            });
        }
        if (option === "menu") {
            main_1.main(db, rl, client);
        }
    });
}
exports.config = config;
