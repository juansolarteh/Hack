const express = require("express");
const router = express.Router();
const fs = require("fs");

const versionPath = `${__dirname}`;

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(versionPath).filter((folder) => {
  const skip = ["index.js"].includes(folder);
  if (!skip) {
    const routerPath = `${versionPath}/${folder}`;
    fs.readdirSync(routerPath).filter((file) => {
      const route = `${folder}/${removeExtension(file)}`;
      router.use(`/${route}`, require(`./${route}`));
      console.log("ROUTE LOADED ==> ", `api/${route}`);
    });
  }
});

module.exports = router;
