import React from "react";
import { useFormik } from "formik";
import { formSchema } from "./TaskFormSchema";
import { toast } from "react-toastify";

const TaskForm = ({ addTasks }) => {
  const initialValues = {
    Title: "",
    Description: "",
    AssignedTo: "",
    Status: "",
  };

  const { values, handleChange, errors, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit: (values, actions) => {
        addTasks(values);
        toast.success("Task added successfully!");
        actions.resetForm();
      },
    });
  return (
    <div className=" d-flex justify-content-between align-items-center mb-4 row g-3 ">
      <div className=" col-md-6 ">
        <input
          type="text"
          name="Title"
          className="form-control"
          id=""
          placeholder="Task Title"
          value={values.Title}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {touched.Title && errors.Title && (
          <div className="text-danger">{errors.Title}</div>
        )}
      </div>
      <div className=" col-md-4">
        <input
          type="text"
          name="AssignedTo"
          className="form-control"
          placeholder="Assigned To"
          id=""
          value={values.AssignedTo}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {touched.AssignedTo && errors.AssignedTo && (
          <div className="text-danger">{errors.AssignedTo}</div>
        )}
      </div>
      <div className=" col-md-2 ">
        <select
          name="Status"
          id=""
          className="form-select"
          value={values.Status}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        {touched.Status && errors.Status && (
          <div className="text-danger">{errors.Status}</div>
        )}
      </div>
      <div className=" col-md-12">
        <input
          type="text"
          name="Description"
          className="form-control"
          id=""
          placeholder=" Task Description"
          value={values.Description}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {touched.Description && errors.Description && (
          <div className="text-danger">{errors.Description}</div>
        )}
      </div>

      <div className=" ">
        <button onClick={handleSubmit} className=" btn btn-success px-5">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
