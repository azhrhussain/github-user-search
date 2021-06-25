import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "styled-bootstrap-grid";
const NotFound = () => (
  <Container>
    <Row>
      <Col lg={12}>
        <div>
          <h1>404 - Not Found!</h1>
          <Link to="/">Go Home</Link>
        </div>
      </Col>
    </Row>
  </Container>
);

export default NotFound;
