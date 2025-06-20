import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [allTask, setAllTask] = useState([]);
  const [allInputs, setAllInputs] = useState({
    Title: "",
    Description: "",
    AssignedTo: "",
    Status: "",
  });

  const [statusInput, setStatusInput] = useState("");
  const handlerChange = (e) => {
    const { value, name } = e.target;
    setAllInputs({ ...allInputs, [name]: value });
  };
  const getData = async () => {
    const res = await fetch("http://localhost:5000/task");
    const data = await res.json();
    console.log(data);
    setAllTask(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const addTasks = async () => {
    console.log(allInputs);
    try {
      const res = await fetch("http://localhost:5000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allInputs),
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/task/${id}`, {
        method: "DELETE",
      });

      setAllTask((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };
  return (
    <>
      <div className=" d-flex justify-content-center flex-column align-items-center mt-4">
        <div className=" card p-3 w-25 d-flex gap-2 shadow border-0">
          <h4>Add Task</h4>
          <div className=" d-flex gap-5">
            Title :{" "}
            <input
              type="text"
              name="Title"
              className=" ms-5"
              id=""
              value={allInputs.Title}
              onChange={handlerChange}
            />
          </div>
          <div className=" d-flex gap-5">
            Description :{" "}
            <input
              type="text"
              name="Description"
              id=""
              value={allInputs.Description}
              onChange={handlerChange}
            />
          </div>
          <div className=" d-flex gap-5">
            Assigned To :{" "}
            <input
              type="text"
              name="AssignedTo"
              id=""
              value={allInputs.AssignedTo}
              onChange={handlerChange}
            />
          </div>
          <div className=" d-flex gap-5">
            Status :{" "}
            <select
              name="Status"
              id=""
              className=" ms-5"
              value={allInputs.Status}
              onChange={handlerChange}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className=" d-flex mt-1">
            <button onClick={addTasks} className=" btn btn-success btn-sm px-5">
              Add
            </button>
          </div>
        </div>
      </div>
      <h3 className=" w-75 m-auto mb-0"> Task List :</h3>

      <div className=" d-flex gap-5 p-2 flex-wrap justify-content-center">
        {allTask.map((task, index) => (
          <div className=" card w-25 mb-3 border-0 shadow p-4">
            <h3>Title : {task.Title}</h3>
            <p>
              <strong>Description</strong> : {task.Description}
            </p>
            <p className=" d-flex gap-4">
              <span>
                <strong>Assigned To</strong> : {task.AssignedTo}
              </span>{" "}
              <span>
                <strong>Status</strong> : {task.Status}
              </span>
            </p>
            <button
              onClick={() => deleteTask(task._id)}
              className=" btn btn-outline-danger btn-sm"
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
