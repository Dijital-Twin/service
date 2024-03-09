const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  name: String,
  url: String,
  api_key: String,
});

module.exports = mongoose.model("Model", modelSchema);
