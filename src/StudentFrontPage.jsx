import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button, Col, Container, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Header from "./components/Header";
import UpdateStudent from "./components/Admin/UpdateStudent";
import StudentMenus from "./components/StudentMenus";
import Logout from "./Logout";
import ViewSchedule from "./components/Student/ViewSchedule";
import AccessResult from "./components/Student/AccessResult";
import AccessAttendance from "./components/Student/AccessAttendance";
import ViewProfile from "./components/Student/ViewProfile";
import ViewNote from "./components/Student/ViewNote";


function StudentFrontPage() {
  const token1 = localStorage.getItem("token");
  if (token1 == null) {
    return <Redirect to="/" />;
  }
  if(token1.toString() != "studentLoggedIn"){
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Router>
        <Container>
          <Header />
          <Row>
            <Col lg={3}>
              <StudentMenus></StudentMenus>
            </Col>

            <Col lg={9}>
              <Route path="/home1" exact>
                <Home />
              </Route>

              <Route path="/view_schedule" exact>
                <ViewSchedule></ViewSchedule>
              </Route>

              <Route path="/get_subject_marks" exact>
                <AccessResult></AccessResult>
              </Route>
              <Route path="/get_subject_attendance" exact>
                <AccessAttendance></AccessAttendance>
              </Route>
              <Route path="/view_profile" exact>
                <ViewProfile></ViewProfile>
              </Route>

              <Route path="/update_student" exact>
                <UpdateStudent></UpdateStudent>
              </Route>

              <Route path="/view_notes" exact>
                <ViewNote></ViewNote>
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

export default StudentFrontPage;
