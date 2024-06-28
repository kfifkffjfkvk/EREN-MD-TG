const {
  cmd
} = require("../lib/plugins.js");

cmd(
{
    name: "tb",
    category: "downloader",
    desc: "To Download Terabox files"
},
async ({
    m, bot ,args
}) => {

   /* if (!args) return await m.reply("Enter Query,Number");
  await m.reply(`Please Wait...`);*/
  let link = "https://teraboxapp.com/s/1Ayy_AReDU0H5yirdyOXmuA"

  const axios = require('axios');

  const options = {
    method: 'POST',
    url: 'https://terabox-downloader-direct-download-link-generator.p.rapidapi.com/fetch',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'c673a06fd0msh318123d49dcfa79p134a66jsn6a48c0800a01',
      'X-RapidAPI-Host': 'terabox-downloader-direct-download-link-generator.p.rapidapi.com'
    },
    data: {
      url: `${link}`
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  

  
})