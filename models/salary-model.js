const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Salary = new Schema({
  username: { type: String, required: true },
  hours: { type: Object, required: true },
  institutions: { type: Array, required: true },
  creationDate: { type: Date, required: true },
  total: { type: Number, required: true },

});

module.exports = mongoose.model("salaries", Salary);

