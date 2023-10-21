const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, unique: true },
  password: { type: String, require: true },
  permissions: [{
    ref: "permission",
    type: mongoose.Schema.Types.ObjectId
  }]
},
{
  timestamps: true,
  versionKey: false
});

schema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

schema.statics.checkPassword = async (password, gottenPassword) => {
  return await bcrypt.compare(gottenPassword, password);
};

module.exports = mongoose.model("user", schema);
