const mongoose = require("mongoose");

// create users schema
const BotRegisterationSchema = new mongoose.Schema({
  user_id: String,
  username: String,
  email: String,
  //verified: Boolean
});

const tgusers = new mongoose.model("TG_BOT_USER_REGISTRATION", BotRegisterationSchema);

module.exports = tgusers;
