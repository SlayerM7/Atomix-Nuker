"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbOptions = void 0;
let dbOptions = {
    saveReadable: true,
    saveInternal: {
        func: true,
        dir: "data",
        fileName: "db",
    },
};
exports.dbOptions = dbOptions;
