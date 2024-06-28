const {
  cmd
} = require("../lib/plugins.js");
const gis = require("g-i-s");
const axios = require('axios');

cmd(
{
    name: "img",
    category: "misc",
    desc: "To download images from google"
},
async ({
    m, args, bot 
}) => {
  try {
      async function gimage(query, amount = 5) {
          let list = [];
          return new Promise((resolve, reject) => {
              gis(query, async (error, result) => {
                  for (
                      var i = 0;
                      i < (result.length < amount ? result.length: amount);
                      i++
                  ) {
                      list.push(result[i].url);
                      resolve(list);
                  }
              });
          });
      }
      if (!args) return await m.reply("Enter Query,Number");
      let [query,
          amount] = args.split(",");
      let result = await gimage(query, amount);
      await m.reply(`Downloading ${amount || 5} images for ${query}`);
      for (let i of result) {
        await m.replyWithPhoto({ url : i})
      }

  } catch (e) {
      console.log(e)
  }



  
})