import { colors } from "../utils/themes";
import { createString } from "../utils/createString";
import { main } from "./main";
import { logoOptions } from "../utils/logoOptions";
import { logo } from "../utils/logo";

function changeTheme(rl, db, client) {
  process.title = "[Atomix-Nuker] - Theme changer";
  console.clear();
  logoOptions(db);
  rl.question(createString("Enter theme colour", db), (color) => {
    if (color === "exit" || color === "menu") {
      main(db, rl, client);
      return;
    }
    if (color === "themes") {
      console.log(colors.join("\n"));
      setTimeout(() => {
        console.log(" ");
        rl.question(
          createString(
            "Would you like to continue to *menu* or set *theme*\n> ",
            db
          ),
          (xx) => {
            if (xx === "menu") {
              main(db, rl, client);
              return;
            } else if (xx === "theme") {
              changeTheme(rl, db, client);
              return;
            } else {
              changeTheme(rl, db, client);
              return;
            }
          }
        );
      }, 1000);
      return;
    }
    if (!colors.includes(color)) {
      setTimeout(() => {
        changeTheme(rl, db, client);
      }, 2000);
      return console.log(createString("Unknown color", db, "semi"));
    }
    db.set("theme", color);
    db.save();
    process.title = `[Atomix-Nuker] - Set theme to ${color}`;
    console.log(createString("Set new theme", db, "semi"));
    setTimeout(() => {
      console.log(createString("Saved data", db, "semi"));
    }, 1500);
    setTimeout(() => {
      main(db, rl, client);
    }, 2000);
  });
}

export { changeTheme };
