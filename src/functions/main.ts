import { createString } from "../utils/createString";
import { logoOptions } from "../utils/logoOptions";
import { changeTheme } from "./changeTheme";
import { config } from "./config";
import { credits } from "./credits";
import { destroyClient } from "./destroyClient";
import { scrape } from "./scrape";
import { wizz } from "./wizz";

function main(db, rl, client) {
  process.title = "[Atomix nuker] - Main menu";
  console.clear();
  logoOptions(db);

  rl.question(createString("Enter option", db), (option) => {
    option = option.toLowerCase();
    if (option === "x") {
      changeTheme(rl, db, client);
    }
    if (option === "2") {
      scrape(rl, db, client);
    }
    if (option === "1") {
      wizz(client, db, rl);
    }
    if (option === "c") {
      destroyClient(client, rl, db);
    }
    if (option === "credits" || option === "credit" || option === "z") {
      credits(db, rl, client);
    }
    if (option === "v") {
      config(db, rl, client);
    }
  });
}

export { main };
