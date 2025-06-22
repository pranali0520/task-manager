const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const db = require("./connection");
const Task = require("./model");
app.use(cors());
app.use(express.json());

app.get("/task", async (req, res) => {
  const allTask = await Task.find();
  res.json(allTask);
});
app.post("/task", async (req, res) => {
  const newTask = new Task({
    Title: req.body.Title,
    Description: req.body.Description,
    AssignedTo: req.body.AssignedTo,
    Status: req.body.Status,
  });
  await newTask.save();
  res.json({ msg: "Task Added successfully..", newTask });
});
app.put("/task/:id", async (req, res) => {
  const { Title, Description, AssignedTo, Status } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
    Title,
    Description,
    AssignedTo,
    Status,
  });
  res.json({ msg: "Task Updated successfully..", updatedTask });
});
app.delete("/task/:id", async (req, res) => {
  const selectTask = await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Task deleted successfully..", selectTask });
});

//server
app.listen(5000, () => {
  console.log(`server running at port : http://localhost:5000`);
});
