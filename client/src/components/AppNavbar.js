import React, { useState, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";
import logo from "../images/logo.png";

const AppNavbar = ({ auth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{auth && auth.user ? `Hello ${auth.user.name}` : ""}</strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );
  return (
    <div>
      <Navbar color="light" light expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">
            <img src={logo} height="50" width="50" alt="logo" />
            <span> JankBoards</span>
          </NavbarBrand>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {auth && auth.isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(AppNavbar);
