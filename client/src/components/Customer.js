import { useContext } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import GlobalState from "../context/globalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Customer({
  _id,
  username,
  email,
  telephone,
  profileImage,
}) {
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
  const handleEdit = (e) => {
    // e.preventDefault();
    navigate("/customers/edit", {
      state: { _id, username, email, telephone, profileImage },
    });
  };

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={profileImage}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{username}</span>
        </Card.Title>
        <div className="">
          <b>
            Email:{""}
            {email}
          </b>
        </div>
        <div className="">
          <b>
            Telephone:{""}
            {telephone}
          </b>
        </div>

        <div className="d-flex align-items-center justify-content-center mt-4">
          <Row>
            <Col>
              {role && (
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => handleEdit(e)}
                >
                  Edit
                </button>
              )}
            </Col>
            <Col>
              {role && (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(_id)}
                >
                  Delete
                </button>
              )}
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
}
