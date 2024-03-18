const mongoose = require("mongoose");
const db = mongoose.connection;
exports.dbConnection = () => {
  try {
    const url =
      process.env.NODE_MODE === "production"
        ? process.env.MONGODB_URI
        : process.env.LOCAL_DB;
    mongoose.connect(url);
    db.on("error", (e) => {
      console.log(e);
    });
    db.once("open", () => {
      console.log("db connected succesfully");
    });
  } catch (e) {
    console.log(e);
  }
};
