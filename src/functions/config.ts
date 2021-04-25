import { white } from "chalk";
import { configLogo } from "../utils/config/configLogo";
import { nukeSettingsLogo } from "../utils/config/nukeSettingsLogo";
import { scrapeSettingsLogo } from "../utils/config/ScrapeSettings";
import { createString } from "../utils/createString";
import { getTheme } from "../utils/getTheme";
import { logo } from "../utils/logo";
import { main } from "./main";

function config(db, rl, client) {
  process.title = "[Atomix-Nuker] - Config";
  console.clear();
  configLogo(db);
  let mainColor = getTheme(db);
  rl.question(createString("Enter option", db), (option) => {
    if (option === "1") {
      process.title = "[Atomix Nuker] - Config nuke settings";
      console.clear();
      logo(db);
      nukeSettingsLogo(db);
      rl.question(createString("Enter option", db), (op) => {
        if (op === "1") {
          rl.question(
            createString("Would you like to *enable* or *disable* this", db),
            (enableDisable) => {
              db.set(
                `settings.nuke.useold`,
                enableDisable === "enable" ? true : false
              );
              db.save();
              setTimeout(() => {
                config(db, rl, client);
              }, 2000);
            }
          );
        } else if (op === "2") {
          rl.question(
            createString("Would you like to *enable* or *disable* this", db),
            (enableDisable) => {
              db.set(
                `settings.nuke.setnew`,
                enableDisable === "enable" ? true : false
              );
              db.save();
              setTimeout(() => {
                config(db, rl, client);
              }, 2000);
            }
          );
        }
      });
    }
    if (option === "2") {
      process.title = "[Atomix Nuker] - Config scrape settings";
      console.clear();
      logo(db);
      scrapeSettingsLogo(db);
      rl.question(createString("Enter option", db), (op) => {
        if (op === "1") {
          rl.question(
            createString("Would you like to *enable* or *disable* this", db),
            (enableDisable) => {
              db.set(
                `settings.scrape.delnuke`,
                enableDisable === "enable" ? true : false
              );
              db.save();
              setTimeout(() => {
                config(db, rl, client);
              }, 2000);
            }
          );
        } else if (op === "2") {
          rl.question(
            createString("Would you like to *enable* or *disable* this", db),
            (enableDisable) => {
              db.set(
                `settings.scrape.checknuke`,
                enableDisable === "enable" ? true : false
              );
              db.save();
              setTimeout(() => {
                config(db, rl, client);
              }, 2000);
            }
          );
        }
      });
    }
    if (option === "menu") {
      main(db, rl, client);
    }
  });
}

export { config };
