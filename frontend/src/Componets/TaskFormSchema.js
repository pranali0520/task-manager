import * as Yup from "yup";

export const formSchema = Yup.object({
  Title: Yup.string().min(3).required("Title is required"),
  Description: Yup.string().min(5).required("Description is required"),
  AssignedTo: Yup.string().min(3).required("Assign to name is required"),
  Status: Yup.string().required("Status is required"),
});
