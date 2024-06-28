const { Telegraf } = require("telegraf");
const config = require("./config");
const { smsg } = require("./lib/smsg.js");
const { commands } = require('./lib/plugins.js');
const path = require('path');
const util = require('util')
const fs = require('fs');
const Spinnies = require("spinnies")
const spinnies = new Spinnies({
  spinner: { interval: 200, frames: [" ", "_"], }
})

async function Bot() {
  spinnies.add("spinner-2", { text: " ", color: "cyan" })
  const bot = new Telegraf(config.BOT_TOKEN);

  bot.start((m) => m.reply("Hello!"));
fs.readdirSync("./plugins").forEach((plugin) => {
                if (path.extname(plugin).toLowerCase() == ".js") {
                    require("./plugins/" + plugin);
                }
            });
            console.log("ᴘʟᴜɢɪɴs ʟᴏᴀᴅᴇᴅ");
          console.log("\n======[  ☞︎︎︎  ʟᴏɢs  ☜︎︎︎   ]======\n")

  
  bot.on("message", async (msg) => {
     //var ms;
     var m = smsg(msg, bot);
      //let m = smsg(msg)
      //console.log(util.format(m))
    
      //console.log(JSON.parse(JSON.stringify(msg)))
   // let command = m.text.trim().split(' ').shift().toLowerCase()
   /* let args;
        args = m.text
        args = args.split(" ")
        args.shift()
*/
/////////////////////////////////////////
/////////////////////////////////////////
     commands.map(async (cmd) => {
              
//if (cmd.fromMe && !( SUDO.split(",").includes(m.sender.split("@")[0]) || m.isSelf )) { return; }
                  
                let comman = m.text
                ? m.text[0].toLowerCase() + m.text.slice(1).trim(): "";

                let args;

                switch (true) {
                    
                    case cmd.name && cmd.name.test(comman):
                    args = m.text.replace(cmd.name, '$1').trim();
                        cmd.function({
                            m, args, bot 
                        });
                        break;

                    case m.body && cmd.on === "text":
                        args = m.body
                        cmd.function({
                            m, args, bot
                        });
                        break;
                    case cmd.on === "image" || cmd.on === "photo":
                        if (m.type === "imageMessage") {
                            cmd.function({
                                m, bot 
                            });

                        }
                        break;

                    case cmd.on === "sticker":
                        if (m.type === "stickerMessage") {
                            cmd.function({
                                m, bot
                            });
                        }
                        break;
                    case cmd.on === "video":
                        if (m.type === "videoMessage") {
                            cmd.function({
                                m, bot  
                            });
                        }
                        break;

                    default:
                        break;
                }

            })


/////////////////////////////////////////
/////////////////////////////////////////

    
  });

  bot.launch({
    dropPendingUpdates: true,
  });
}

Bot();

