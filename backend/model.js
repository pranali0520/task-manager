const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  Title: String,
  Description: String,
  AssignedTo: String,
  Status: String,
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
