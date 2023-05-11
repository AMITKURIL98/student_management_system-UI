import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const UpdateCourse = () => {
  var [courseDto, setCourseDto] = useState();

  var [obj, setObj] = useState([]);
  const getCourseList = () => {
    axios.get(`${base_url}/admin/get_all_courses`).then(
      (response) => {
        setObj(response.data);
      },
      (error) => {
        //error handling
        toast.error("Somthing went wrong !");
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getCourseList();
  }, []);

  const selecttedCourse = () => {
    var selectedElement = document.getElementById("sel1");
    setCourseDto({ ...courseDto, courseName: selectedElement.value });
  };

  var subjectList = [];

  const formHandler = (event) => {
    event.preventDefault();
    const Data = {
      courseName: courseDto.courseName,
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
    axios.post(`${base_url}/admin/update_course`, data).then(
      (response) => {
        //response from server
        console.log(response.data);
        toast.success("Course Updated Successfully !");
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
            CourseName
            <select
              className="form-select"
              name=""
              id="sel1"
              onChange={selecttedCourse}
            >
              <option>--SELECT COURSE--</option>
              {obj.map((e) => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
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
            <Button color="primary" outline onClick={formHandler}>
              Update Course
            </Button>

          </FormGroup>
        </Form>
      </Fragment>
    </div>
  );
};

export default UpdateCourse;
