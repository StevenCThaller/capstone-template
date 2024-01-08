import React, { useState, useContext } from "react";
import {
  Card,
  Row,
  Col,
  Modal,
  Button,
  Container,
  Carousel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../utils/api.utils";
import ParkResultsDisplay from "../components/ParkResultsDisplay/ParkResultsDisplay";
import { ParkContext } from "../components/ParkLocator/ParkLocatorContext";

const SearchPage = () => {
  const { dogParks } = useContext(ParkContext);

  const [zipcode, setZipcode] = useState("");
  const [breed, setBreed] = useState("");
  const [username, setUsername] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const handleSearch = async () => {
    try {
      const lowercaseUsername = username.toLowerCase();
      const lowercaseBreed = breed.toLowerCase();
      const formattedSize = selectedSize.toLowerCase();

      if (
        zipcode.trim() !== "" ||
        lowercaseBreed.trim() !== "" ||
        lowercaseUsername.trim() !== "" ||
        formattedSize.trim() !== ""
      ) {
        const response = await api.get("/users/search", {
          params: {
            zipcode: zipcode,
            breed: lowercaseBreed,
            username: lowercaseUsername,
            size: formattedSize,
          },
        });

        setSearchResults(response.data);

        setZipcode("");
        setBreed("");
        setUsername("");
        setSelectedSize("");
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error handling search:", error.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div style={{ marginTop: "60px" }}>
        <Carousel>
          <Carousel.Item>
            <img
              src="/dogplay1.jpg"
              alt=""
              style={{ height: "300px", borderRadius: "10px" }}
            />
            <Carousel.Caption style={{ marginTop: "100px" }}>
              <p className="fs-5 text-uppercase mt-3">
                <img
                  src="logo.png"
                  alt="Spot Logo"
                  style={{ marginRight: "2px", height: "70px", width: "70px" }}
                />
                Life is better with friends
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="/dogplay2.jpg"
              alt=""
              style={{ height: "300px", borderRadius: "10px" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="/dogplay3.jpg"
              alt=""
              style={{ height: "300px", borderRadius: "10px" }}
            />
          </Carousel.Item>
        </Carousel>

        <Col md={6} style={{ display: "flex", flexDirection: "row" }}>
          <Container
            id="searchBox"
            style={{
              width: "500px",
              height: "400px",
              marginLeft: "200px",
            }}
          >
            <Container
              style={{
                paddingTop: "2px",
                backgroundColor: "lightgray",
                height: "42px",
                width: "350px",
                borderRadius: "5px",
                marginTop: "50px",
                marginBottom: "10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>
                <img
                  src="/logo.png"
                  alt="Spot Logo"
                  style={{ marginRight: "5px", height: "40px", width: "40px" }}
                />
                Find A Friend!
              </p>
            </Container>
            <Container
              style={{
                paddingTop: "8px",
                backgroundColor: "lightgray",
                height: "42px",
                width: "350px",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              Please enter one search field below:
            </Container>
            <input
              type="text"
              value={username}
              placeholder="Username"
              style={{ width: "350px", height: "42px", marginBottom: "10px" }}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="text"
              value={breed}
              placeholder="Breed"
              style={{ width: "350px", height: "42px", marginBottom: "10px" }}
              onChange={(e) => setBreed(e.target.value)}
            />

            {/* Dropdown menu for Size */}
            <select
              id="size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              style={{ marginBottom: "10px", height: "42px", width: "350px" }}
            >
              <option value="">Select Size</option>
              <option value="small">Small (22 lbs or less)</option>
              <option value="medium">Medium (23 lbs - 57 lbs)</option>
              <option value="large">Large (58 lbs or more)</option>
            </select>

            <input
              type="text"
              value={zipcode}
              placeholder="Zipcode"
              style={{ width: "350px", height: "42px", marginBottom: "10px" }}
              onChange={(e) => setZipcode(e.target.value)}
            />

            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Container>
          <Container id="parkSearchContainer" x>
            <ParkResultsDisplay />
          </Container>
        </Col>

        <Row>
          {searchResults.map((user, index) => {
            const userProfileUrl = `/profile/u/${user.username}`;
            return (
              <Col key={index} xs={12} sm={6} md={3}>
                <Card
                  style={{
                    maxWidth: "18rem",
                    maxHeight: "23rem",
                    margin: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={user.profile_image}
                    alt={`Profile of ${user.username}`}
                    style={{ height: "100px", width: "100px" }}
                  />
                  <Card.Body style={{ textAlign: "center" }}>
                    <Card.Title>
                      <Link to={userProfileUrl}>{user.username}</Link>
                    </Card.Title>
                    <Card.Text>
                      <span style={{ fontWeight: "bold" }}>Pet's Name:</span>{" "}
                      {user.dog.name}
                    </Card.Text>
                    <Card.Text>
                      <span style={{ fontWeight: "bold" }}>Pet's Breed:</span>{" "}
                      {user.dog.breed}
                    </Card.Text>
                    <Card.Text>
                      <span style={{ fontWeight: "bold" }}>Pet's Size:</span>{" "}
                      {user.dog.size}
                    </Card.Text>
                    <Card.Text>
                      <span style={{ fontWeight: "bold" }}>Zip Code:</span>{" "}
                      {user.zipcode}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Modal for empty search */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <img
                src="logo.png"
                alt="Spot Logo"
                style={{ marginRight: "5px", height: "70px", width: "70px" }}
              />
              Whoa there!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You won't find friends with an empty search!
            <br />
            Please enter at least one field.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Let's Try Again
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default SearchPage;
