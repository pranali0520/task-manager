import React from "react";

const TaskForm = ({ allInputs, handlerChange, addTasks }) => {
  return (
    <div className=" d-flex justify-content-between align-items-center mb-4 ">
      <div className=" ">
        Title :{" "}
        <input
          type="text"
          name="Title"
          className=""
          id=""
          value={allInputs.Title}
          onChange={handlerChange}
        />
      </div>
      <div className="">
        Description :{" "}
        <input
          type="text"
          name="Description"
          id=""
          value={allInputs.Description}
          onChange={handlerChange}
        />
      </div>
      <div className=" ">
        Assigned To :{" "}
        <input
          type="text"
          name="AssignedTo"
          id=""
          value={allInputs.AssignedTo}
          onChange={handlerChange}
        />
      </div>
      <div className=" ">
        Status :{" "}
        <select
          name="Status"
          id=""
          className=" "
          value={allInputs.Status}
          onChange={handlerChange}
        >
          <option value="">Select</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className=" ">
        <button onClick={addTasks} className=" btn btn-success px-5">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
