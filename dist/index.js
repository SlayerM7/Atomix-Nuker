"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainLoad = void 0;
const discord_js_1 = require("discord.js");
const main_1 = require("./functions/main");
const createString_1 = require("./utils/createString");
const dbOptions_1 = require("./utils/dbOptions");
const saveNewToken_1 = require("./utils/saveNewToken");
const child_process_1 = __importDefault(require("child_process"));
const logo_1 = require("./utils/logo");
const { slayersDB } = require("slayer.db");
const db = new slayersDB(dbOptions_1.dbOptions);
child_process_1.default.exec("mode 85, 22");
function mainLoad() {
    process.title = "[Atomix-Nuker] - Setup";
    console.clear();
    logo_1.logo(db);
    const readline = require("readline");
    const client = new discord_js_1.Client();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    if (db.has("token")) {
        rl.question(createString_1.createString("Would you like to use a saved token", db), (tokenOption) => {
            if (tokenOption === "y" || tokenOption === "yes") {
                let objSaved = db.get(`token`);
                console.log(createString_1.createString("Starting to attempt to log into " + objSaved.clientUsername, db, "semi"));
                client.on("ready", () => {
                    process.title = `[Atomix-Nuker] -> Logged in as ${client.user.username}`;
                    console.clear();
                    main_1.main(db, rl, client);
                });
                client.login(objSaved.token).catch(() => {
                    console.log(createString_1.createString("Failed to log in", db));
                });
            }
            else if (tokenOption === "n" || tokenOption === "no") {
                saveNewToken_1.saveNewToken(db, rl);
            }
        });
    }
    else
        saveNewToken_1.saveNewToken(db, rl);
}
exports.mainLoad = mainLoad;
mainLoad();
