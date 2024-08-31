const {cmd} = require("../lib/plugins.js");
const axios = require("axios");
const fetch = require("node-fetch");

cmd({
      on: "text"
  },
  async ({m, bot, args}) => {
    if (args.startsWith("https://terasharelink.com/")) {
      try {
      let { data } = await axios.get(`https://viper.xasena.me/api/terabox?url=${args}`);
      let result = data.data
      let imgbuff = await (await fetch(result.thumnail)).buffer();
      await m.replyWithPhoto({ source: imgbuff },
                             { caption: `File name : ${result.file_name}\nFile size : ${result.size}` },
                             { reply_to_message_id : m.message.message_id });
      let vidbuff = await (await fetch(result.downloadUrl)).buffer();
      return await m.replyWithVideo({ source: vidbuff },{ reply_to_message_id : m.message.message_id } );
      } catch (e) {
        console.log(e);
      }
      }
  });
