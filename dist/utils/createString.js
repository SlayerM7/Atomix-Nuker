"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createString = void 0;
const chalk_1 = require("chalk");
const getTheme_1 = require("./getTheme");
function createString(question, db, ...type) {
    let mainColor = getTheme_1.getTheme(db);
    let r = `${mainColor("> ")}${chalk_1.white(question)}${mainColor(":")} `;
    if (type) {
        if (type[0] === "semi")
            r = `${mainColor("> ")}${chalk_1.white(question)} `;
    }
    return r;
}
exports.createString = createString;
