import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button, Col, Container, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Logout from "./Logout";
import AddNotes from "./components/Admin/AddNotes";
import FacultyMenus from "./components/FacultyMenus";

function FacultyFrontPage() {
  const token1 = localStorage.getItem("token");
  if (token1 == null) {
    return <Redirect to="/" />;
  }
  if(token1.toString() != "facultyLoggedIn"){
    return <Redirect to="/" />;
  }  
  return (
      <div>
        <Router>
          <Container>
            <Header />
            <Row>
              <Col lg={3}>
                <FacultyMenus></FacultyMenus>
              </Col>

              <Col lg={9}>
                <Route path="/home2" exact>
                  <Home />
                </Route>

                <Route path="/add_notes" exact>
                  <AddNotes></AddNotes>
                </Route>

                <Route path="/logout" exact>
                  <Logout></Logout>
                </Route>

              </Col>
            </Row>
          </Container>
        </Router>
      </div>
  );
}

export default FacultyFrontPage;
