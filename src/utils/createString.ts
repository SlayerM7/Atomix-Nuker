import { red, white, magentaBright } from "chalk";
import { getTheme } from "./getTheme";
function createString(question, db, ...type) {
  let mainColor = getTheme(db);
  let r = `${mainColor("> ")}${white(question)}${mainColor(":")} `;
  if (type) {
    if (type[0] === "semi") r = `${mainColor("> ")}${white(question)} `;
  }
  return r;
}

export { createString };
