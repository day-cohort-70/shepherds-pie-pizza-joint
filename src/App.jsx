{
  /* The following line can be included in your src/index.js or App.js file */
}
import "bootstrap/dist/css/bootstrap.min.css";
import { Component, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

import { Pizzas } from "./components/pizzas/Pizzas.jsx";

function App() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Pizza Joint</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#orders">Order List</Nav.Link>
            <Nav.Link href="#new-order">New Orders</Nav.Link>
            <Nav.Link href="#employees">Employees</Nav.Link>
            <Nav.Link href="#sales">Sales Report</Nav.Link>
            <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      {<Pizzas />}
    </>
  );
}

export default App;
