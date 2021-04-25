import { createString } from "../utils/createString";
import { logo } from "../utils/logo";
import { logoOptions } from "../utils/logoOptions";

function destroyClient(client, rl, db) {
  process.title = "[Atomix-Nuker] - Logging out";
  console.clear();
  logo(db);
  console.log(createString("Logging out of client...", db, "semi"));
  client.destroy();
  setTimeout(() => {
    console.log(createString("Successfully logged out of client", db, "semi"));
    setTimeout(() => {
      rl.question(
        createString("Would you like to exit Atmoix nuker", db),
        (op) => {
          op = op.toLowerCase();
          if (op === "y" || op === "yes") {
            process.title = "[Atomix-Nuker] - Exiting";
            console.log(createString("Re-capturing data", db, "semi"));
            setTimeout(() => {
              console.log(
                createString("Successfully validated data", db, "semi")
              );
              setTimeout(() => {
                console.log(
                  createString("Attempting to exit process", db, "semi")
                );
              }, 200);
              setTimeout(() => {
                process.exit();
              }, 1000);
            }, 1000);
          }
        }
      );
    }, 1000);
  }, 1000);
}

export { destroyClient };
