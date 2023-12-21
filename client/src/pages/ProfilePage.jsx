import React, { useState, useEffect } from "react";
import api from "../../utils/api.utils";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProfile from "../components/EditProfile/EditProfile";
import { useNavigate, useParams } from "react-router-dom";
import { useProvideAuth } from "../hooks/useAuth";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { Container, Card, Button, Modal } from "react-bootstrap";
import Logo from "/logo.png";

function ProfilePage() {
  const { state } = useProvideAuth();
  const [isEditing, setIsEditing] = useState(false);
  let params = useParams();
  console.log(params);
  const {
    state: { isAuthenticated },
  } = useRequireAuth();

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userResponse = await api.get(`/users/${params.uname}`);
      } catch (err) {
        console.error(err.message);
      }
    };
    isAuthenticated && getUser();
  }, [params.uname, isAuthenticated]);

  return (
    <>
      <Container className="text-center">
        <Card>
          <Card.Body>
            <Card.Title>Hello, {state.user.username} !</Card.Title>
            <div className="row">
              <div className="col-md-4 mb-4">
                <img
                  src={Logo}
                  alt="Profile Picture"
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="col-md-8">
                <Card>
                  <Card.Body>
                    <Card.Title>Placeholder</Card.Title>
                    <Card.Text>Placeholder</Card.Text>
                  </Card.Body>
                </Card>
                <Card className="mt-3">
                  <Card.Body>
                    <Card.Title>Placeholder</Card.Title>
                    <Card.Text>Placeholder</Card.Text>
                  </Card.Body>
                </Card>
                {console.log(state.user, params.uname)}
                {params.uname && (
                  // state.user.username === params.uname &&
                  <>
                    <Button className="mt-3" onClick={handleEditProfile}>
                      {isEditing ? "Close Edit Profile" : "Edit Profile"}
                    </Button>
                  </>
                )}
                <Modal show={isEditing} onHide={handleEditProfile} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{isEditing && <EditProfile />}</Modal.Body>
                </Modal>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ProfilePage;
