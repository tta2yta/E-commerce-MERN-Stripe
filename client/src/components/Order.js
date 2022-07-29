import { useContext } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import GlobalState from "../context/globalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";

export default function Order({
  _id,
  userId,
  totalAmt,
  paymentMoode,
  status,
  no,
}) {
  // console.log(_id, userId, totalAmt, paymentMoode, status, no);
  const { role, token } = useContext(GlobalState);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios
      .delete(`http://ec2-34-229-215-51.compute-1.amazonaws.com:3001/api/users/${id}`, config)
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
  // const handleEdit = (e) => {
  //   // e.preventDefault();
  //   navigate("/customers/edit", {
  //     state: { _id, username, email, telephone, profileImage },
  //   });
  // };

  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Order No</th>
          <th>User Id</th>
          <th>Total amount in USD</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>no</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}
