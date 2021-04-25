import { Client } from "discord.js";
import { main } from "./functions/main";
import { createString } from "./utils/createString";
import { dbOptions } from "./utils/dbOptions";
import { saveNewToken } from "./utils/saveNewToken";
import child_process from "child_process";
import { logo } from "./utils/logo";

const { slayersDB } = require("slayer.db");
const db = new slayersDB(dbOptions);

child_process.exec("mode 85, 22");
function mainLoad() {
  process.title = "[Atomix-Nuker] - Setup";
  console.clear();
  logo(db);
  const readline = require("readline");
  const client = new Client();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  if (db.has("token")) {
    rl.question(
      createString("Would you like to use a saved token", db),
      (tokenOption) => {
        if (tokenOption === "y" || tokenOption === "yes") {
          let objSaved = db.get(`token`);
          console.log(
            createString(
              "Starting to attempt to log into " + objSaved.clientUsername,
              db,
              "semi"
            )
          );
          client.on("ready", () => {
            process.title = `[Atomix-Nuker] -> Logged in as ${client.user.username}`;
            console.clear();
            main(db, rl, client);
          });
          client.login(objSaved.token).catch(() => {
            console.log(createString("Failed to log in", db));
          });
        } else if (tokenOption === "n" || tokenOption === "no") {
          saveNewToken(db, rl);
        }
      }
    );
  } else saveNewToken(db, rl);
}
mainLoad();

export { mainLoad };
