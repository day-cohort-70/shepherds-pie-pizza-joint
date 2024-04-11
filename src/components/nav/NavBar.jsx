import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'

const NavBar = ({ currentUser}) => {
  const navigate = useNavigate()



 

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" className="nav-header">
        🍕 <span className="navbar-title">PIZZA-JOINT</span> 
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/orderList" className="nav-link">Order List</Nav.Link>
          <Nav.Link as={Link} to="/newOrder" className="nav-link">New Order</Nav.Link>
          {currentUser?.isAdmin && <>
          <Nav.Link as={Link} to="/employees" className="nav-link">Employees</Nav.Link>
          <Nav.Link as={Link} to="/salesReport" className="nav-link">Sales Report</Nav.Link></>}
          <Nav.Link as={Link} to="/" onClick={() => {
            localStorage.removeItem("pizza_user")
            navigate("/", { replace: true })
          }} className="nav-link">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
