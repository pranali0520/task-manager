import React, { useState } from "react";

const TaskList = ({ allTask, deleteTask, getData }) => {
  const [editStatus, setEditStatus] = useState(null);

  const handleEditClick = (task) => {
    console.log(task);
    setEditStatus({ ...task });
  };

  const handleChange = (e) => {
    setEditStatus({ ...editStatus, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/task/${editStatus._id} `, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editStatus),
      });

      setEditStatus(null);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table class="table table-bordered">
      <thead className="table-light">
        <tr>
          <th scope="col" className=" text-center">
            #
          </th>
          <th scope="col" className=" text-center">
            Title
          </th>
          <th scope="col" className=" text-center">
            Description
          </th>
          <th scope="col" className=" text-center">
            AssignedTo
          </th>
          <th scope="col" className=" text-center">
            Status
          </th>
          <th scope="col" className=" text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {allTask.map((task, index) => (
          <tr key={task._id}>
            <th scope="row" className=" text-center">
              {index + 1}
            </th>
            {editStatus && editStatus._id === task._id ? (
              <>
                <td>
                  <input
                    type="text"
                    name="Title"
                    className="form-control"
                    value={editStatus.Title}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="Description"
                    className="form-control"
                    value={editStatus.Description}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="AssignedTo"
                    className="form-control"
                    value={editStatus.AssignedTo}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <select
                    name="Status"
                    className="form-select"
                    value={editStatus.Status}
                    onChange={handleChange}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
                <td className=" d-flex gap-3 justify-content-center">
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setEditStatus(null)}
                  >
                    Cancel
                  </button>
                </td>
              </>
            ) : (
              <>
                <td className=" text-center">{task.Title}</td>
                <td className=" text-center">{task.Description}</td>
                <td className=" text-center">{task.AssignedTo}</td>
                <td className=" text-center">{task.Status}</td>
                <td className=" d-flex gap-3 justify-content-center">
                  <button
                    className=" btn btn-sm btn-outline-success w-25"
                    onClick={() => handleEditClick(task)}
                  >
                    Edit
                  </button>
                  <button
                    className=" btn btn-sm btn-outline-danger w-25"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
