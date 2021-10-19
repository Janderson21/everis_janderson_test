import React from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import CarList from "./components/Car/Car";
import Booking from "./components/Booking/Booking";
import Register from "./components/User/Register";
import Login from "./components/User/Login";

const App = () => {
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
    return "";
  };

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} className={"margin-top"}>
            <Switch>
              <Route path="/" exact component={CarList} />
              <Route path="/booking/:id" exact component={Booking} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route
                path="/logout"
                exact
                component={() => (
                  <Login />
                )}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
