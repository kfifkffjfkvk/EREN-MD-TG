const { Telegraf } = require("telegraf");
const config = require("./config");
const { smsg } = require("./lib/smsg.js");
const { commands } = require("./lib/plugins.js");
const path = require("path");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const tgusers = require("./lib/db.js");
const util = require("util");
const fs = require("fs");
const Spinnies = require("spinnies");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const spinnies = new Spinnies({
    spinner: { interval: 200, frames: [" ", "_"] },
});

const isEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

require("http")
    .createServer(async (req, res) => {})
    .listen(process.env?.PORT || 8080, () => true);

// Database connection(mongodb).
mongoose
    .connect(config.MONGO_DB_URI)
    .then(() => {
        console.log("Successfully connected to mongodb database!");
    })
    .catch(() => {
        console.log("Failed to connect mongodb database!");
    });

async function Bot() {
    spinnies.add("spinner-2", { text: "TG-EREN-BOT", color: "cyan" });
    const bot = new Telegraf(config.BOT_TOKEN, { polling: true });

    bot.start((m) => m.reply("Hello!"));
    bot.command("register", async (ctx) => {
        var m = await smsg(ctx, bot);
        let data = await tgusers.findOne({ user_id: m.user.id });
        if (data?.user_id == m.user.id) return m.reply("You Are Already Registered!");
        if (ctx.payload === "" || ctx.payload == null)
            return m.reply("Please Send Your Email Address!");
        if (isEmail(ctx.payload)) {
            m.reply(
                "We Have Sent You A Verification Code, Please Check Your Email!",
            );
            await sleep(3000);
            m.reply("Enter The Verification Code!");
            let code = Math.floor(Math.random() * (999999 - 1000 + 1));
            m.reply("Sample code to email: " + code);
        } else {
            m.reply("Invalid Email Address!");
        }
    });

    bot.command("sudoreg", async (ctx) => {
        var m = await smsg(ctx, bot);
        let botuser = new tgusers({
            user_id: m.user.id,
            username: m.user.name,
            email: "kawshiksubash06467@gmail.com",
            verified: false,
        });
        botuser.save();
        await m.reply("Registered!");
    });

    fs.readdirSync("./plugins").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() == ".js") {
            require("./plugins/" + plugin);
        }
    });
    console.log("\nPlugins Loaded...");

    bot.on("message", async (msg) => {
        var m = smsg(msg, bot);
        let data = await tgusers.findOne({ user_id: m.user.id });
        if (data?.user_id == m.user.id) {
            commands.map(async (cmd) => {
                let comman = m.text
                    ? m.text[0].toLowerCase() + m.text.slice(1).trim()
                    : "";

                let args;

                switch (true) {
                    case cmd.name && cmd.name.test(comman):
                        args = m.text.replace(cmd.name, "$1").trim();
                        cmd.function({
                            m,
                            args,
                            bot,
                        });
                        break;

                    case m.body && cmd.on === "text":
                        args = m.body;
                        cmd.function({
                            m,
                            args,
                            bot,
                        });
                        break;
                    case cmd.on === "image" || cmd.on === "photo":
                        if (m.type === "imageMessage") {
                            cmd.function({
                                m,
                                bot,
                            });
                        }
                        break;

                    case cmd.on === "sticker":
                        if (m.type === "stickerMessage") {
                            cmd.function({
                                m,
                                bot,
                            });
                        }
                        break;
                    case cmd.on === "video":
                        if (m.type === "videoMessage") {
                            cmd.function({
                                m,
                                bot,
                            });
                        }
                        break;

                    default:
                        break;
                }
            });

            /////////////////////////////////////////
            /////////////////////////////////////////
        } else {
            m.reply(
                "You are not registered in the database. Please register first using /register command.",
            );
        }
    });

    bot.launch({
        dropPendingUpdates: true,
    });
}

Bot();
