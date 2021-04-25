"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTheme = void 0;
const chalk_1 = require("chalk");
function getTheme(db) {
    let theme = chalk_1.magentaBright;
    try {
        if (db.has("theme")) {
            let them = db.get("theme");
            if (them === "yellow")
                theme = chalk_1.yellow;
            if (them === "green")
                theme = chalk_1.green;
            if (them === "blue")
                theme = chalk_1.blue;
            if (them === "default")
                theme = chalk_1.magentaBright;
            if (them === "cyan")
                theme = chalk_1.cyan;
            if (them === "red")
                theme = chalk_1.red;
            if (them === "gray")
                theme = chalk_1.gray;
            if (them === "green bright")
                theme = chalk_1.greenBright;
            if (them === "red bright")
                theme = chalk_1.redBright;
            if (them === "yellow bright")
                theme = chalk_1.yellowBright;
            if (them === "blue bright")
                theme = chalk_1.blueBright;
            if (them === "magenta")
                theme = chalk_1.magenta;
        }
    }
    catch (_a) { }
    return theme;
}
exports.getTheme = getTheme;
