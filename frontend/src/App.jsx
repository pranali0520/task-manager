import { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./Componets/TaskList";
import TaskForm from "./Componets/TaskForm";

function App() {
  const [allTask, setAllTask] = useState([]);
  const [allInputs, setAllInputs] = useState({
    Title: "",
    Description: "",
    AssignedTo: "",
    Status: "",
  });

  const handlerChange = (e) => {
    const { value, name } = e.target;
    setAllInputs({ ...allInputs, [name]: value });
  };

  const getData = async () => {
    const res = await fetch("http://localhost:5000/task");
    const data = await res.json();
    setAllTask(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const addTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allInputs),
      });
      getData();
      setAllInputs({
        Title: "",
        Description: "",
        AssignedTo: "",
        Status: "Pending",
      });
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
      <div className=" w-75 m-auto mt-5 shadow p-3 mb-5">
        <h3 className=" text-center mb-4"> Task Form</h3>
        <TaskForm
          allInputs={allInputs}
          handlerChange={handlerChange}
          addTasks={addTasks}
        />
      </div>
      <div className=" w-75 m-auto d-flex justify-content-between">
        <h3 className=" "> Task List :</h3>
      </div>

      <div className=" w-75 m-auto mt-4">
        <TaskList allTask={allTask} deleteTask={deleteTask} getData={getData} />
      </div>
    </>
  );
}

export default App;
