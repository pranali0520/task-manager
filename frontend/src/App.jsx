import { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./Componets/TaskList";
import TaskForm from "./Componets/TaskForm";
import { toast } from "react-toastify";

function App() {
  const [allTask, setAllTask] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  //API for all data
  const getData = async () => {
    const res = await fetch("http://localhost:5000/task");
    const data = await res.json();
    setAllTask(data);
  };

  useEffect(() => {
    getData();
  }, []);

  // API for for add New data
  const addTasks = async (task) => {
    try {
      const res = await fetch("http://localhost:5000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  //API for delete one data
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/task/${id}`, {
        method: "DELETE",
      });

      setAllTask((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.error("Task deleted successfully!");
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <>
      <div className=" w-75 m-auto mt-5 shadow p-3 mb-5">
        <h3 className=" text-center mb-4"> Task Form</h3>
        <TaskForm
          // allInputs={allInputs}
          // handlerChange={handlerChange}
          addTasks={addTasks}
        />
      </div>
      <div className=" w-75 m-auto d-flex justify-content-between row align-items-center">
        <h3 className=" col-md-4"> Task List :</h3>
        <div className=" col-md-6 d-flex align-items-center">
          <label
            class="form-label mb-0 text-dark fw-bold"
            style={{ width: "9.5rem" }}
          >
            Filter by Status:
          </label>
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div className=" w-75 m-auto mt-4">
        <TaskList
          allTask={allTask}
          statusFilter={statusFilter}
          deleteTask={deleteTask}
          getData={getData}
        />
      </div>
    </>
  );
}

export default App;
