import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../services/index";

const NavigationBar = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    window.location.href = "/login";
  };

  const guestLinks = (
    <>
      <div className="mr-auto"></div>
      <Nav className="navbar-right">
        <Link to={"login"} className="nav-link">
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </Link>
      </Nav>
    </>
  );
  const userLinks = (
    <>
      <Nav className="mr-auto">
        <Link to={"/"} className="nav-link">
          Ver Carros
        </Link>
      </Nav>
      <Nav className="navbar-right">
        <span className="m-2">{auth.username}</span>
        <Link to={"logout"} className="nav-link" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Sair
        </Link>
      </Nav>
    </>
  );

  return (
    <Navbar>
      <Link to={"/"} className="navbar-brand">
        Locação Carros de Luxo - Everis
      </Link>
      {auth.isLoggedIn ? userLinks : guestLinks}
    </Navbar>
  );
};

export default NavigationBar;
