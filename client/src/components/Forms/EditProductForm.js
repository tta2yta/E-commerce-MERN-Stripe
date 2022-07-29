import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import axios from "axios";
import GlobalState from "../../context/globalState";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function EditProductForm({ state }) {
  const location = useLocation();
  let { token } = useContext(GlobalState);

  console.log(location.state._id);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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

  const initialValues = { ...location.state };

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
        .patch(
          `http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api/products/${location.state._id}`,
          values
        )
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
    navigate(-1);
  };
  return (
    <div className="EditProductForm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        EnableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form>
              <h3>Edit product</h3>
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
                Edit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default EditProductForm;
