import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AddCourse = () => {
  const [courseDto, setCourseDto] = useState({});
  var subjectList = [];

  const formHandler = (event) => {
    event.preventDefault();
    const Data = {
      courseName: courseDto.courseName,
      capacity: courseDto.capacity,
      subjects: subjectList,
    };
    console.log(Data);
    if (Data.subjects != null && Data.subjects != "") {
      postToServer(Data);
    } else {
      toast.error("Please add subject");
    }
  };

  const postToServer = (data) => {
    axios.post(`${base_url}/admin/add_course`, data).then(
      (response) => {
        //response from server
        console.log(response.data);
        toast.success("Course Added Successfully !");
      },
      (error) => {
        //error handling
        toast.error("Somthing went wrong !");
        console.log(error);
      }
    );
  };

  const addSubjects = () => {
    var temp = document.getElementById("subject").value;
    if (temp != "") {
      subjectList.push(document.getElementById("subject").value);
      document.getElementById("span1").innerHTML = subjectList.toString();
      document.getElementById("subject").value = null;
    }
  };

  return (
    <div>
      <ToastContainer />
      <Fragment>
        <Form>
          <FormGroup>
            <label for="courseName">Course Name</label>
            <Input
              type="text"
              placeholder="Enter course name here"
              name="courseName"
              id="courseName"
              required
              onChange={(e) => {
                setCourseDto({ ...courseDto, courseName: e.target.value });
              }}
            />
            
            <br />
            <label for="capacity">Course capacity</label>
            <Input
              type="number"
              placeholder="Enter course capacity here"
              name="capacity"
              id="capacity"
              required
              onChange={(e) => {
                setCourseDto({ ...courseDto, capacity: e.target.value });
              }}
            />
            <br />
            <label for="subject">Subject Name</label>
            <span>
              <Input
                type="text"
                placeholder="Enter subjects here"
                name="subject"
                id="subject"
                className="subList"
                required
              />
            </span>
            <br />
            <Button color="primary" outline onClick={addSubjects}>
              Add Subject
            </Button>
            <br />
            <br />
            Subject List :<span id="span1" className="span1"></span>
            <br />
            <br />
            <Button type="submit" color="primary" outline onClick={formHandler}>
              Add Course
            </Button>
          </FormGroup>
        </Form>
      </Fragment>
    </div>
  );
};

export default AddCourse;
