const { Telegraf } = require("telegraf");
const config = require("./config");
const { smsg } = require("./lib/smsg.js");
const { commands } = require('./lib/plugins.js');
const path = require('path');
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const util = require('util');
const fs = require('fs');
const Spinnies = require("spinnies");
const spinnies = new Spinnies({
  spinner: { interval: 200, frames: [" ", "_"], }
})

require('http')
 .createServer(async (req, res) => {})
 .listen(process.env?.PORT || 8080, () => true);

// Database connection(mongodb).
mongoose.connect(config.MONGO_DB_URI).then(() => {
 console.log("Successfully connected to mongodb database!");
}).catch(() => {
 console.log("Failed to connect mongodb database!");
});

async function Bot() {
  spinnies.add("spinner-2", { text: "TG-EREN-BOT", color: "cyan" });
  const bot = new Telegraf(config.BOT_TOKEN, { polling: true });
  //let buff = await (await fetch(config.START_IMG)).buffer();
  bot.start((m) => m.reply("Hello!"));
fs.readdirSync("./plugins").forEach((plugin) => {
                if (path.extname(plugin).toLowerCase() == ".js") {
                    require("./plugins/" + plugin);
                }
            });
            console.log("\nPlugins Loaded...");
        
  
  bot.on("message", async (msg) => {
     var m = smsg(msg, bot);
    
     commands.map(async (cmd) => {
              

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

