"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const createString_1 = require("../utils/createString");
const logoOptions_1 = require("../utils/logoOptions");
const changeTheme_1 = require("./changeTheme");
const config_1 = require("./config");
const credits_1 = require("./credits");
const destroyClient_1 = require("./destroyClient");
const scrape_1 = require("./scrape");
const wizz_1 = require("./wizz");
function main(db, rl, client) {
    process.title = "[Atomix nuker] - Main menu";
    console.clear();
    logoOptions_1.logoOptions(db);
    rl.question(createString_1.createString("Enter option", db), (option) => {
        option = option.toLowerCase();
        if (option === "x") {
            changeTheme_1.changeTheme(rl, db, client);
        }
        if (option === "2") {
            scrape_1.scrape(rl, db, client);
        }
        if (option === "1") {
            wizz_1.wizz(client, db, rl);
        }
        if (option === "c") {
            destroyClient_1.destroyClient(client, rl, db);
        }
        if (option === "credits" || option === "credit" || option === "z") {
            credits_1.credits(db, rl, client);
        }
        if (option === "v") {
            config_1.config(db, rl, client);
        }
    });
}
exports.main = main;
