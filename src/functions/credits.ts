import { createString } from "../utils/createString";
import { logo } from "../utils/logo";
import { main } from "./main";

function credits(db, rl, client) {
  process.title = "[Atomix-Nuker] - Credits";
  console.clear();
  logo(db);
  console.log(createString("Atomix nuker", db, "semi"));
  setTimeout(() => {
    console.log(createString("Created by Slayer", db, "semi"));
    setTimeout(() => {
      console.log(createString("Made in TypeScript", db, "semi"));
      setTimeout(() => {
        console.log(
          createString("Github: https://github.com/SlayerM7", db, "semi")
        );
        setTimeout(() => {
          console.log(" ");
          rl.question(createString("Type anything to continue", db), () => {
            main(db, rl, client);
          });
        }, 1000);
      }, 1000);
    }, 1000);
  }, 500);
}

export { credits };
