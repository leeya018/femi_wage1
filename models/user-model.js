const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  confirm: { type: Boolean, required: true },
  password: { type: String, required: true },
  creationDate: { type: Date, required: true },
});

module.exports = mongoose.model("users", User);
