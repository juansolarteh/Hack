const mongoose = require("mongoose");

const connect = () => {
  return mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

module.exports = connect();
