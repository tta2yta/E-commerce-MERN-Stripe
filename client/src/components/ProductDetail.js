import * as React from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

export default function ProductDetail() {
  const { id } = React.useParams();

  const [product, setProduct] = React.useState("");

  React.useEffect(() => {
    (async () => {
      await axios
        .get(`http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch(console.log);
    })();
  }, [id]);

  return (
    <>
      {product.map((item) => (
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
              <span className="ms-2 text-muted">
                {formatCurrency(item.price)}
              </span>
            </Card.Title>
            <div className="">
              <b>
                Description:{""}
                {item.desc}
              </b>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Catagory : {""}</b>
                {item.catagories &&
                  item.catagories.map((item, i) => <span key={i}>{item}</span>)}
              </li>
              <li className="list-group-item">
                <b>Availability: </b>
                {""}
                {item.inStock ? "available" : "not available"}
              </li>
            </ul>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
