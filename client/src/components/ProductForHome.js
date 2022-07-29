import * as React from "react";
import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

export default function Product({ ...item }) {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={item.productImage}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{item.name}</span>
          <span className="ms-2 text-muted">{formatCurrency(item.price)}</span>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
