import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import CustomNavBar from '../components/CustomNavbar/CustomNavbar';
import { useProvideAuth } from '../hooks/useAuth';

const HomePage = () => {
  const {
    state: { user },
  } = useProvideAuth();

  console.log(user, 'user');

  return (
    <div>
      {/* Conditionally render Navbars */}
      {user ? (
        <CustomNavBar />
      ) : (
        <Navbar bg="light" expand="lg" style={{ border: '1px solid black' }}>
          <Container fluid>
            <Row className="d-flex align-items-center">
              {/* Logo */}
              <Col xs={6}>
                <Navbar.Brand href="/homepage">
                  <img
                    src="/logo.png"
                    width="30%"
                    height="auto"
                    alt="Your Logo"
                  />
                </Navbar.Brand>
              </Col>
              {/* Navigation Links */}
              <Col xs={6} className="d-flex justify-content-end">
                <Nav className="ms-auto" navbarScroll>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="/search">Search</Nav.Link>
                  <Nav.Link href="/feed">Feed</Nav.Link>
                  <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Container>
        </Navbar>
      )}

      {/* Main Content */}
      <Container className="mt-4">
        {/* Create Post Panel */}
        <Row className="d-flex justify-content-center ">
          <Col xs={10} className="mb-4" style={{ border: '1px solid black' }}>
            <div className="bg-light p-3">
              <h4>Create Post</h4>
              {/* Placeholder for CreatePost component */}
              <p>Placeholder for CreatePost component</p>
            </div>
          </Col>
        </Row>

        {/* Feed Component */}
        <Row className="d-flex justify-content-center">
          <Col xs={10} style={{ border: '1px solid black' }}>
            <div className="bg-light p-3">
              <h4>Feed</h4>
              {/* Placeholder for Feed component */}
              <p>Placeholder for Feed component</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
