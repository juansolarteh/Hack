const express = require("express");
const morgan = require(`morgan`);
const cors = require("cors");

const app = express();

//settings
app.set("port", process.env.PORT || 3001);
app.set("json spaces", 2);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

//Middlewares
app.use(morgan("dev")); //combined
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api", require("./routes"));

module.exports = app;
