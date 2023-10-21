const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: String,
    idRestaurant: {
      ref: "restaurant",
      type: mongoose.Schema.Types.ObjectId,
      require: true
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("section", schema);
