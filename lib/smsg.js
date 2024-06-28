function smsg(msg, bot) {
  let m = {};
  msg.text = msg.message.text || msg.message.caption || "";
  msg.id = msg.message.message_id;
  msg.user = {
    id: msg.message.from.id,
    name: msg.message.from.first_name || "" + msg.message.from.last_name || "",
  };
  msg.body = msg.message.text || msg.message.caption || "";

  if (msg.message.reply_to_message) {
msg.quoted = {
      id: msg.message.reply_to_message?.message_id,
      sender: {
        id: msg.message.reply_to_message?.from.id,
        name:
          msg.message.reply_to_message.from?.first_name ||
          "" + msg.message.reply_to_message.from?.last_name ||
          "",
        username: msg.message.reply_to_message.from?.username,
      },
    };
  }
msg.runtime = async () => {
seconds = Number(`${process.uptime()}`);
var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor(seconds % (3600 * 24) / 3600);
var m = Math.floor(seconds % 3600 / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
return dDisplay + hDisplay + mDisplay + sDisplay;
}
msg.uptime = async () => {
const duration = process.uptime();
const seconds = Math.floor(duration % 60);
const minutes = Math.floor((duration / 60) % 60);
const hours = Math.floor((duration / (60 * 60)) % 24);
const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
.toString()
.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
return formattedTime;
}
  
  return msg;
}

module.exports = {
  smsg,
};
