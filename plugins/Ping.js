const {
    cmd
} = require("../lib/plugins.js");

cmd(
  {
      name: "ping",
      category: "misc",
      desc: "To check ping"
  },
  async ({
      m, bot 
  }) => {

      const start = new Date().getTime();

let pong = await m.reply("Checking Ping...")
const end = new Date().getTime();

await m.reply(`Latency : ${end - start} ms`)
  })