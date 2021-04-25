"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyClient = void 0;
const createString_1 = require("../utils/createString");
const logo_1 = require("../utils/logo");
function destroyClient(client, rl, db) {
    process.title = "[Atomix-Nuker] - Logging out";
    console.clear();
    logo_1.logo(db);
    console.log(createString_1.createString("Logging out of client...", db, "semi"));
    client.destroy();
    setTimeout(() => {
        console.log(createString_1.createString("Successfully logged out of client", db, "semi"));
        setTimeout(() => {
            rl.question(createString_1.createString("Would you like to exit Atmoix nuker", db), (op) => {
                op = op.toLowerCase();
                if (op === "y" || op === "yes") {
                    process.title = "[Atomix-Nuker] - Exiting";
                    console.log(createString_1.createString("Re-capturing data", db, "semi"));
                    setTimeout(() => {
                        console.log(createString_1.createString("Successfully validated data", db, "semi"));
                        setTimeout(() => {
                            console.log(createString_1.createString("Attempting to exit process", db, "semi"));
                        }, 200);
                        setTimeout(() => {
                            process.exit();
                        }, 1000);
                    }, 1000);
                }
            });
        }, 1000);
    }, 1000);
}
exports.destroyClient = destroyClient;
