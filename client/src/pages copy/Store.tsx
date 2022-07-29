import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import axios from "axios";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Store() {
  const { listItems, setListItems } = useShoppingCart();
  const [searchValue, setSearchValue] = useState<string>("");
  const [category, setCategory] = useState<string>("construction");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDk4MmFmMzNhY2QyNmUwMGFhZWMxYyIsInJvbGUiOiJidXllciIsInVzZXJuYW1lIjoidGVkIiwiaWF0IjoxNjU4NTI1MzAyfQ.QBzSZApCko4Ty6NRX68nxuJ8j2sx7HtkRmYzAK1MJDU";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products", config)
      .then((res) => setListItems(res.data))
      .catch(console.log);
  }, []);

  const filterValue = { name: searchValue };

  const handleSearch = (e: any) => {
    e.preventDefault();
    let url = "";
    if (searchValue === "") {
      url = `http://localhost:3001/api/products/filter/${category}`;
    } else if (searchValue !== "") {
      url = `http://localhost:3001/api/products/filter/${searchValue}/${category}`;
    }
    console.log(url);
    axios
      .get(url)
      .then((res) => setListItems(res.data))
      .catch((err) => console.log(err));
  };

  const handleCancel = (e: any) => {
    console.log(category);
    e.preventDefault();
    setSearchValue("");
    axios
      .get("http://localhost:3001/api/products", config)
      .then((res) => setListItems(res.data))
      .catch(console.log);
  };

  return (
    <>
      <h1>Store</h1>
      <Row className="d-flex">
        <div className="d-flex flex-row border boredr-1 p-3 mb-2 justify-content-end">
          <label>Search by name:</label>
          <input
            className="w-50"
            type="text"
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
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
