"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveNewToken = void 0;
const discord_js_1 = require("discord.js");
const __1 = require("..");
const createString_1 = require("./createString");
let client = new discord_js_1.Client();
function saveNewToken(db, rl) {
    process.title = "[Atomix-Nuker] - Add token";
    console.clear();
    rl.question(createString_1.createString("Enter token", db), (token) => {
        if (token === "main") {
            __1.mainLoad();
        }
        console.log(createString_1.createString("Checking token", db, "semi"));
        client.on("ready", () => {
            console.log(createString_1.createString("Successfully logged into client", db, "semi"));
            setTimeout(() => {
                console.log(createString_1.createString("Logging out of client and saving token", db, "semi"));
                db.set("token", {
                    clientUsername: client.user.username,
                    clientUser: client.user,
                    token,
                });
                db.save();
                client.destroy();
                rl.close();
                __1.mainLoad();
            }, 2000);
        });
        client.login(token).catch(() => {
            process.title = "[Atomix-Nuker] - Token invalid";
            console.log(createString_1.createString("The token is invalid", db, "semi"));
            setTimeout(() => {
                rl.question(createString_1.createString("Type anything to continue", db), () => {
                    rl.close();
                    __1.mainLoad();
                });
            }, 500);
        });
    });
}
exports.saveNewToken = saveNewToken;
