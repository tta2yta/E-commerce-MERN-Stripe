import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Forms/FormikControl";
import axios from "axios";

function SignupForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const options = [
    { key: "seller", value: "seller" },
    { key: "buyer", value: "buyer" },
  ];
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    telephone: "",
    profileImage: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid format").required("Required"), // email shoudd be an email format regex and is required
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Password must match")
      .required("Required"),
    role: Yup.string().required("Required"),
    telephone: Yup.string().required("Required"),
  });

  const onSubmit = async (values, onSubmitProps) => {
    await axios
      .post("http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api/users/signup", values)

      .then((res) => {
        if (res.status === 409) {
          alert("User is already existing ");
          navigate("/signup");
        } else {
          alert("successfully signed up ");
          navigate("/signin");
          setError(null);
        }
      })
      .catch((err) => {
        setError(new Error("There is some thing wrong"));
        alert(error);
      });

    // reset
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };
  return (
    <div className="Signup">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <h1 style={{ fontWeight: "bold", color: "blue" }}>Sign-up</h1>
              <FormikControl
                control="input"
                type="text"
                label="Username"
                name="username"
              />
              <FormikControl
                control="input"
                type="email"
                label="Email"
                name="email"
              />
              <FormikControl
                control="input"
                type="password"
                label="Password"
                name="password"
              />
              <FormikControl
                control="input"
                type="password"
                label="Confirm Password"
                name="confirmPassword"
              />
              <FormikControl
                control="radio"
                type="text"
                label="Role"
                options={options}
                name="role"
              />
              <FormikControl
                control="input"
                type="text"
                label="Telephone"
                name="telephone"
              />
              <FormikControl
                control="input"
                type="text"
                label="Profile image Url"
                name="profileImage"
              />
              <button type="submit" disabled={!formik.isValid}>
                Submit
              </button>
              <div>
                If already have account please{" "}
                <Link to="/signin">
                  <b>Sign-in!</b>
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SignupForm;
