const {
  cmd
} = require("../lib/plugins.js");
const util = require("util");
const axios = require("axios");
const fetch = require("node-fetch");
const fs = require("fs");

cmd(
{
    on: "text"
},
async ({
    bot, m, args
}) => {
   // m.reply("hey")
    
    if (args.startsWith(">")) {
        try {
            let evaled = await eval(`(async () => { ${args.replace(">", "")} })()`);
            if (typeof evaled !== "string") evaled = util.inspect(evaled);
            await m.reply(`${evaled}`)
        } catch (err) {
            await m.reply(`_${util.format(err)}_`);
        }
    }
});
