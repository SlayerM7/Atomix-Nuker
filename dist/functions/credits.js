"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credits = void 0;
const createString_1 = require("../utils/createString");
const logo_1 = require("../utils/logo");
const main_1 = require("./main");
function credits(db, rl, client) {
    process.title = "[Atomix-Nuker] - Credits";
    console.clear();
    logo_1.logo(db);
    console.log(createString_1.createString("Atomix nuker", db, "semi"));
    setTimeout(() => {
        console.log(createString_1.createString("Created by Slayer", db, "semi"));
        setTimeout(() => {
            console.log(createString_1.createString("Made in TypeScript", db, "semi"));
            setTimeout(() => {
                console.log(createString_1.createString("Github: https://github.com/SlayerM7", db, "semi"));
                setTimeout(() => {
                    console.log(" ");
                    rl.question(createString_1.createString("Type anything to continue", db), () => {
                        main_1.main(db, rl, client);
                    });
                }, 1000);
            }, 1000);
        }, 1000);
    }, 500);
}
exports.credits = credits;
