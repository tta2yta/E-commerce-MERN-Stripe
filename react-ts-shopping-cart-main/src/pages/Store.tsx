import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import axios from "axios";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Store() {
  const { listItems, setListItems } = useShoppingCart();
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

  return (
    <>
      <h1>Store</h1>
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
