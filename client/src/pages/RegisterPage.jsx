import React, { useState } from "react";
//import axios from "axios";
import { Form, Button, InputGroup, Col } from "react-bootstrap";
import AddDog from "../components/AddDog/AddDog";
import api from "../../utils/api.utils"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    dog: {
      name: "",
      breed: "",
      size: "",
    },
    zipcode: "",
  });

  const [dogs, setDogs] = useState([]);

  const handleAddDog = (newDog) => {
    setDogs([...dogs, newDog]);
  };

  const [placeholders, setPlaceholders] = useState({
    username: "PuppyBreath4Lyfe",
    email: "DogzRule@gmail.com",
    password: "Enter your password",
    confirmPassword: "Confirm your password",
    dogName: "Sir Barks-a-Lot",
    dogBreed: "All breeds welcome!",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDogInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      dog: {
        ...formData.dog,
        [name]: value,
      },
    });
  };

  const handleFocus = (fieldName) => {
    setPlaceholders({
      ...placeholders,
      [fieldName]: "",
    });
  };

  const handleBlur = (fieldName) => {
    if (!formData[fieldName]) {
      setPlaceholders({
        ...placeholders,
        [fieldName]: getDefaultPlaceholder(fieldName),
      });
    }
  };

  const getDefaultPlaceholder = (fieldName) => {
    switch (fieldName) {
      case "username":
        return "PuppyBreath4Lyfe";
      case "email":
        return "YourEmail@example.com";
      case "password":
        return "Enter your password";
      case "confirmPassword":
        return "Confirm your password";
      case "dogName":
        return "Sir Barks-a-Lot";
      case "dogBreed":
        return "Enter your dog's breed";
      default:
        return "";
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/signup", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <section
      id="register"
      className="container mt-5"
      style={{
        backgroundColor: "rgba(129, 195, 215, 0.3)",
        border: "3px solid #16425B",
        borderRadius: "5px",
        padding: "20px",
      }}
    >
      <h2>Doggy Adventures Await You!</h2>
      <Form onSubmit={handleFormSubmit} className="mt-3">
        {/* Users info: */}
        <Form.Group controlId="formUsername" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            Choose a username!
          </Form.Label>
          <InputGroup>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleInputChange}
              onFocus={() => handleFocus("username")}
              onBlur={() => handleBlur("username")}
              placeholder={placeholders.username}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            What is your email address?
          </Form.Label>
          <Form.Control
            type="text"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
            placeholder={placeholders.email}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            Please enter a password:
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
            placeholder={placeholders.password}
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            Confirm your password:
          </Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onFocus={() => handleFocus("confirmPassword")}
            onBlur={() => handleBlur("confirmPassword")}
            placeholder={placeholders.confirmPassword}
          />
        </Form.Group>

        {/* Dog details: */}
        <Form.Group controlId="formDogName" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            What is your dog's name?
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.dog.name}
            onChange={handleDogInputChange}
            onFocus={() => handleFocus("dogName")}
            onBlur={() => handleBlur("dogName")}
            placeholder={placeholders.dogName}
          />
        </Form.Group>

        <Form.Group controlId="formDogBreed" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            Their breed? If unsure, enter 'other' or 'mixed'!
          </Form.Label>
          <Form.Control
            type="text"
            name="breed"
            value={formData.dog.breed}
            onChange={handleDogInputChange}
            onFocus={() => handleFocus("dogBreed")}
            onBlur={() => handleBlur("dogBreed")}
            placeholder={placeholders.dogBreed}
          />
        </Form.Group>

        {/* Dropdown menu for dog's size: */}
        <Form.Group controlId="formDogSize" className="mt-3">
          <Form.Label
            style={{ fontWeight: "bold" }}
            className="d-flex align-items-start"
          >
            Last but not least, how big is your dog?
          </Form.Label>
          <Form.Control
            as="select"
            name="size"
            value={formData.dog.size}
            onChange={handleDogInputChange}
          >
            <option value="">Select Size</option>
            <option value="small">Small (22 lbs or less)</option>
            <option value="medium">Medium (23 lbs - 57 lbs)</option>
            <option value="large">Large (58 lbs or more)</option>
          </Form.Control>
        </Form.Group>

        {/* AddDog component */}
        <AddDog onAddDog={handleAddDog} />

        {/* "Let's Go!" button */}
        <div className="mt-3">
          <Button variant="primary" type="submit">
            Let's Go!
          </Button>
        </div>

        {/* "Already Registered?" section */}
        <Col className="mt-3">
          Already Registered?
          <Button
            as="a"
            variant="link"
            onClick={() => console.log("Navigate to Login")}
          >
            Login
          </Button>
        </Col>
      </Form>
    </section>
  );
};

export default RegisterPage;
