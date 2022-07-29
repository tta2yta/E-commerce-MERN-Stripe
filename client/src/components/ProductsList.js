import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Product } from "../components/Product";
import axios from "axios";
import GlobalState from "../context/globalState";

export default function ProductList() {
  const { listItems, setListItems } = useContext(GlobalState);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("construction");
  useEffect(() => {
    axios
      .get("http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api/products")
      .then((res) => setListItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ---------------------------------
  const filterValue = { name: searchValue };
  const handleSearch = (e) => {
    e.preventDefault();
    let url = "";
    if (searchValue === "") {
      url = `http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api/products/filter/${category}`;
    } else if (searchValue !== "") {
      url = `http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api/products/filter/${searchValue}/${category}`;
    }
    console.log(url);
    axios
      .get(url)
      .then((res) => setListItems(res.data))
      .catch((err) => console.log(err));
  };

  const handleCancel = (e) => {
    console.log(category);
    e.preventDefault();
    setSearchValue("");
    axios
      .get("http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api/products")
      .then((res) => setListItems(res.data))
      .catch(console.log);
  };
  return (
    <>
      <h1>Products</h1>
      <Row className="d-flex">
        <div className="d-flex flex-row border boredr-1 p-3 mb-2 justify-content-end">
          <label>Search by name:</label>
          <input
            className="form-control input-lg w-50 "
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.trim())}
          ></input>
          <select
            className="btn btn-info mx-2"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="construction" defaultChecked>
              construction
            </option>
            <option value="agricultural">agricultural</option>
          </select>
          <button className="btn btn-primary" onClick={(e) => handleSearch(e)}>
            {" "}
            Search
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={(e) => handleCancel(e)}
          >
            {" "}
            Cancel
          </button>
        </div>
      </Row>
      <Row md={2} xs={1} lg={3} className="g-3">
        {listItems.map((item) => (
          <Col key={item._id}>
            <Product {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
