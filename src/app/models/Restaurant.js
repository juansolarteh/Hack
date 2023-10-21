const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  owner: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  name: { type: String, require: true },
  image: { type: String, require: false },
  staff: [{
    ref: "user",
    type: mongoose.Schema.Types.ObjectId
  }],
},
{
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model("restaurant", schema);