import { Client } from "discord.js";
import { mainLoad } from "..";
import { createString } from "./createString";
let client = new Client();

function saveNewToken(db, rl) {
  process.title = "[Atomix-Nuker] - Add token";
  console.clear();
  rl.question(createString("Enter token", db), (token) => {
    if (token === "main") {
      mainLoad();
    }
    console.log(createString("Checking token", db, "semi"));
    client.on("ready", () => {
      console.log(createString("Successfully logged into client", db, "semi"));
      setTimeout(() => {
        console.log(
          createString("Logging out of client and saving token", db, "semi")
        );
        db.set("token", {
          clientUsername: client.user.username,
          clientUser: client.user,
          token,
        });
        db.save();
        client.destroy();

        rl.close();
        mainLoad();
      }, 2000);
    });
    client.login(token).catch(() => {
      process.title = "[Atomix-Nuker] - Token invalid";
      console.log(createString("The token is invalid", db, "semi"));
      setTimeout(() => {
        rl.question(createString("Type anything to continue", db), () => {
          rl.close();
          mainLoad();
        });
      }, 500);
    });
  });
}

export { saveNewToken };
