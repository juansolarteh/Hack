require("dotenv").config();
require("./config/mongo").then(() => {
  //Previous database config
  require("./app/libs/initialSetup").then((resp) => {
    if (resp && process.env.DEPLOY === "false") {
      require("./app/libs/insertsTest");
    }

    const app = require("./app/app");

    //Starting the server
    app.listen(app.get("port"), () => {
      console.log(`Server on port ${app.get("port")}`);
    });
  });
});
