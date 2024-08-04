const {cmd} = require("../lib/plugins.js");
const axios = require("axios");
const fetch = require("node-fetch");

cmd({
      on: "text"
  },
  async ({m, bot, args}) => {
    if (args.startsWith("https://terasharelink.com/")) {
      try {
      await m.reply("Downloading...", { reply_to_message_id : m.message.message_id });
      console.log(args);
      let data = await axios.get(`https://terabox.udayscriptsx.workers.dev/?url=${args}`);
      let result = await data.data.response[0].resolutions['Fast Download'];
      console.log(result);
      let buff = await (await fetch(result)).buffer();
      return await m.replyWithVideo({ source: buff },{ reply_to_message_id : m.message.message_id } );
      } catch (e) {
        console.log(e);
      }
      }
  });
