import { white } from "chalk";
import { getTheme } from "./getTheme";
import { logo } from "./logo";

function logoOptions(db) {
  let mainColor = getTheme(db);
  logo(db);
  console.log(
    mainColor("[") +
      white(1) +
      mainColor("] ") +
      white("Wizz            ") +
      mainColor("[") +
      white(2) +
      mainColor("] ") +
      white("Scrape")
  );
  console.log(
    mainColor("[") +
      white("x") +
      mainColor("] ") +
      white("Change theme    ") +
      mainColor("[") +
      white("c") +
      mainColor("] ") +
      white("Exit")
  );
  console.log(
    mainColor("[") +
      white("v") +
      mainColor("] ") +
      white("Config          ") +
      mainColor("[") +
      white("z") +
      mainColor("] ") +
      white("Credits")
  );
  console.log(" ");
  console.log(" ");
}

export { logoOptions };
