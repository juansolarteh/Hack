const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("permission", schema);
