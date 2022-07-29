import React, { useState, useEffect } from "react";
import GlobalState from "../context/globalState";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import ProductForHome from "../components/ProductForHome";
import { Link } from "react-router-dom";

export default function Home() {
  const [listItems, setListItems] = useState([]);
  const { token } = React.useContext(GlobalState);
  const config = {
    headers: { Authorization: `Bearer ${""}` },
  };
  useEffect(() => {
    axios
      .get("http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api/products")
      .then((res) => setListItems(res.data))
      .catch(console.log);
  }, []);

  return (
    <>
      <h1 className="text mb-2">
        Welcome To Merhaba Construction and Agricultural online Shopping
      </h1>

      <h5 className="text mb-5">
        Please{" "}
        <Link to="/signin">
          {" "}
          <b>Login</b>{" "}
        </Link>{" "}
        if you have an account or{" "}
        <Link to="/signup">
          <b>Sign-up</b>{" "}
        </Link>{" "}
        today to see our best quality products with best offerdable prices!
      </h5>
      <Row md={2} xs={1} lg={3} className="g-3">
        {listItems.map((item) => (
          <Col key={item._id}>
            <ProductForHome {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
