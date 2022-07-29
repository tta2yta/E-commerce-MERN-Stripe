import { useContext, useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import GlobalState from "../context/globalState";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utilities/formatCurrency";

export default function OrdersList() {
  const { token } = useContext(GlobalState);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const axiosInstance = axios.create({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    axiosInstance
      .get("http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api/carts") // do either with cart or order
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios
      .delete(`http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api/carts/${id}`, config)
      .then((res) => {
        console.log(res.data);
        alert("Are you sure you want to delete");
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
        navigate(-1);
      });
  };
  const handleEdit = (e, order) => {
    // e.preventDefault();
    navigate("/customers/edit", {
      state: { ...order },
    });
  };

  return (
    <>
      <h2>List of Odrers</h2>

      <Row md={1} xs={1} lg={1} className="g-3">
        <>
          <Col>
            <Table striped="columns" style={{ marginBottom: "300px" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order No</th>
                  <th>User Id</th>
                  <th>Total Amount</th>
                  <th>Payment Mode</th>
                  <th>Payment Status</th>
                  <th>Order Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{order._id}</td>
                    <td>{order.userId}</td>
                    <td>{formatCurrency(order.totalAmt)}</td>
                    <td>{order.paymentMode}</td>
                    <td>{order.status}</td>
                    <td>{order.createdAt}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(order._id)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(order._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </>
      </Row>
    </>
  );
}
