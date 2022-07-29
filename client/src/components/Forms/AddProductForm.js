import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import axios from "axios";
import GlobalState from "../../context/globalState";

function AddProductForm() {
  let { token } = useContext(GlobalState);
  const [error, setError] = useState(null);
  const checkboxOptions = [
    {
      key: "construction",
      value: "construction",
    },
    {
      key: "agricultural",
      value: "agricultural",
    },
  ];
  const initialValues = {
    name: "",
    price: "",
    desc: "",
    catagories: [],
    productImage: "",
    inStock: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    catagories: Yup.array().required("Required"),
    productImage: Yup.string().required("Required"),
    inStock: Yup.boolean().required("required"),
  });
  const onSubmit = (values, onSubmitProps) => {
    const axiosInstance = axios.create({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    try {
      axiosInstance
        .post("http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api/products", values)
        .then((res) => console.log(res.data))
        .catch((err) => {
          setError(new Error("There is some thing wrong"));
          alert(error);
        });
    } catch (err) {
      console.log(err);
    }
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };
  return (
    <div className="AddProductForm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <h3>Add new product</h3>
              <FormikControl
                control="input"
                type="text"
                label="Name"
                name="name"
              />
              <FormikControl
                control="input"
                type="number"
                label="Price"
                name="price"
              />
              <FormikControl
                control="textarea"
                type="number"
                label="Description"
                name="desc"
              />
              <FormikControl
                control="checkbox"
                label="Product Catagory"
                name="catagories"
                options={checkboxOptions}
              />
              <FormikControl
                control="input"
                type="text"
                label="Product Image Url"
                name="productImage"
              />
              <FormikControl
                control="input"
                type="text"
                label="Availabilty"
                name="inStock"
              />

              <button
                className="btn btn-primary w-100"
                type="submit"
                disabled={!formik.isValid}
              >
                Add
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddProductForm;
