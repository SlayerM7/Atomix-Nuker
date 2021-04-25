"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrape = void 0;
const createString_1 = require("../utils/createString");
const getTheme_1 = require("../utils/getTheme");
const logo_1 = require("../utils/logo");
const main_1 = require("./main");
function actualScrap(rl, db, client, guildID) {
    console.clear();
    logo_1.logo(db);
    let server = client.guilds.cache.get(guildID);
    let roles = [];
    let members = [];
    let channels = [];
    process.title = `[Atomix-Nuker] - Scraping ${server.name}`;
    server.roles.cache.map((role) => {
        roles.push(role.id);
    });
    server.channels.cache.map((channel) => {
        channels.push(channel.id);
    });
    server.members.cache.map((member) => {
        members.push(member.id);
    });
    db.set(`scrape_${guildID}`, {
        members,
        channels,
        roles,
    });
    let c = getTheme_1.getTheme(db);
    db.save();
    console.log(`\n`);
    console.log(createString_1.createString(`Scraped ${c(members.length)} members`, db, "semi"));
    console.log(createString_1.createString(`Scraped ${c(roles.length)} roles`, db, "semi"));
    console.log(createString_1.createString(`Scraped ${c(channels.length)} channels`, db, "semi"));
    setTimeout(() => {
        main_1.main(db, rl, client);
    }, 2000);
}
function scrape(rl, db, client) {
    process.title = "[Atomix-Nuker] - Scraper";
    console.clear();
    logo_1.logo(db);
    rl.question(createString_1.createString("Enter guild ID", db), (guildID) => {
        if (guildID === "exit" || guildID === "menu") {
            main_1.main(db, rl, client);
            return;
        }
        if (!client.guilds.cache.has(guildID)) {
            console.log(createString_1.createString("Unknown server", db, "semi"));
            setTimeout(() => {
                main_1.main(db, rl, client);
            }, 2000);
            return;
        }
        if (db.has(`scrape_${guildID}`)) {
            rl.question(createString_1.createString("There is already scrape data for this server\nWould you like to set *new* data or use *old*", db), (o) => {
                if (o === "new") {
                    actualScrap(rl, db, client, guildID);
                }
                else
                    main_1.main(db, rl, client);
            });
        }
        else
            actualScrap(rl, db, client, guildID);
    });
}
exports.scrape = scrape;
