const mongoose = require("mongoose");

const db = mongoose
  .connect("mongodb://localhost/task")
  .then(() => {
    console.log("mongodb connected sucessfully");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = db;
