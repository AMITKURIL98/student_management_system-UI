import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import AddStudent from "./components/Admin/AddStudent";
import AddFaculty from "./components/Admin/AddFaculty";
import "react-toastify/dist/ReactToastify.css";
import { Button, Col, Container, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Adminmenus from "./components/Adminmenus";
import AddCourse from "./components/Admin/AddCourse";
import AddSchedule from "./components/Admin/AddSchedule";
import UpdateSchedule from "./components/Admin/UpdateSchedule";
import AddAdmin from "./components/Admin/AddAdmin";
import UpdateCourse from "./components/Admin/UpdateCourse";
import Logout from "./Logout";
import AddAttendanceAndMarks from "./components/Admin/AddAttendanceAndMarks";
import UpdateAttendanceAndMarks from "./components/Admin/UpdateAttendanceAndMarks";
import AddNotes from "./components/Admin/AddNotes";

function AdminFrontPage() {
  const token1 = localStorage.getItem("token");
  if (token1 == null) {
    return <Redirect to="/" />;
  }
  if(token1.toString() != "adminLoggedIn"){
    return <Redirect to="/" />;
  }  
  return (
      <div>
        <Router>
          <Container>
            <Header />
            <Row>
              <Col lg={3}>
                <Adminmenus></Adminmenus>
              </Col>

              <Col lg={9}>
                <Route path="/home" exact>
                  <Home />
                </Route>

                <Route path="/add_student" exact>
                  <AddStudent></AddStudent>
                </Route>

                <Route path="/add_faculty" exact>
                  <AddFaculty />
                </Route>

                <Route path="/add_new_course" exact>
                  <AddCourse></AddCourse>
                </Route>

                <Route path="/update_course" exact>
                  <UpdateCourse></UpdateCourse>
                </Route>

                <Route path="/add_schedule" exact>
                  <AddSchedule></AddSchedule>
                </Route>

                <Route path="/update_schedule" exact>
                  <UpdateSchedule></UpdateSchedule>
                </Route>

                <Route path="/update_attendance_marks" exact>
                  <UpdateAttendanceAndMarks></UpdateAttendanceAndMarks>
                </Route>

                <Route path="/add_attendance_marks" exact>
                  <AddAttendanceAndMarks></AddAttendanceAndMarks>
                </Route>

                <Route path="/add_admin" exact>
                  <AddAdmin></AddAdmin>
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

export default AdminFrontPage;
