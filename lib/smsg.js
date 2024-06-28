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
  /*msg.reply = (text) => {
  return msg.reply(text)
}*/

  return msg;
}

module.exports = {
  smsg,
};
