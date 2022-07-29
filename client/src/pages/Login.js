import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Forms/FormikControl";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import GlobalState from "../context/globalState";

function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setToken, setRole, setUserId } = useContext(GlobalState);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values, onSubmitProps) => {
    await axios
      .post("http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api/users/signin", values)
      .then((res) => {
        if (res.data.success) {
          setToken(res.data.data);
          setRole(res.data.isAdmin);
          setUserId(res.data.id);
          alert("successful login");
          navigate("/products");
          setError(null);
        } else {
          alert("Sorry something wrong !Try again later");
          navigate("/signin");
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
    <div className="Login">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <h1 style={{ fontWeight: "bold", color: "blue" }}>Log in!</h1>
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
              <div style={styles}>
                If you do not have account please{" "}
                <Link to="/signup">
                  <b>Sign-up!</b>
                </Link>
              </div>
              <button type="submit" disabled={!formik.isValid}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

const styles = {
  marginRight: "40px",
};

export default LoginForm;
