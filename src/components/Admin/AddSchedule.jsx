import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AddSchedule = () => {
  var [scheduleDto, setScheduleDto] = useState({});

  //Function to fetch the course list upon page load
  var [courseList, setCourseList] = useState([]);
  const getCourseList = () => {
    axios.get(`${base_url}/admin/get_all_courses`).then(
      (response) => {
        setCourseList(response.data);
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

  const [selectedCourse, setSelectedCourse] = useState({});

  const selecttedCourse = () => {
    var selectedElement = document.getElementById("sel1");
    // alert(selectedElement.value);
    setSelectedCourse(selectedElement.value);
    if (selectedCourse != null) {
      getSubjectList();
    }
  };
  //   //Code to fetch the subject list after selecting the course name
  var [subjectList, setSubjectList] = useState([]);
  const getSubjectList = () => {
    axios
      .get(
        `${base_url}/admin/get_students_and_subject_list?courseName=${
          document.getElementById("sel1").value
        }`
      )
      .then(
        (response) => {
          setSubjectList(response.data[0]);
        },
        (error) => {
          //error handling
          toast.error("Somthing went wrong !");
          console.log(error);
        }
      );
  };

  const [selectedSubjectName, setSelectedSubjectName] = useState({});
  const seletedSubjectName = () => {
    var selectedElement2 = document.getElementById("sel2");
    alert(selectedElement2.value);
    setSelectedSubjectName(selectedElement2.value);
  };

  const formHandler = (event) => {
    event.preventDefault();
    var data = {
      courseName: selectedCourse,
      date: scheduleDto.date,
      time: scheduleDto.time,
      subject: selectedSubjectName,
      link: scheduleDto.link,
      password: scheduleDto.password,
    };
    console.log(data);
    addPostToServer(data);
  };

  const addPostToServer = (data) => {
    axios.post(`${base_url}/admin/add_schedule`, data).then(
      (response) => {
        //response from server
        console.log(response.data);
        
        if(response.data === "Added schedule for this subject"){
          toast.success("Schedule Added Successfully !");
        }
        if(response.data === "Already added schedule for this subject"){
          toast.warning("Schedule already exists!");
        }
      },
      (error) => {
        //error handling
        toast.warning("Faculty not found!");
        console.log(error); 
      }
    );
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
              {courseList.map((e) => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
            <br />
            <label for="date">Date</label>
            <Input
              type="date"
              placeholder="Enter the date"
              name="date"
              id="date"
              onChange={(e) => {
                setScheduleDto({ ...scheduleDto, date: e.target.value });
              }}
            />
            <br />
            <label for="time">Time</label>
            <Input
              type="time"
              placeholder="Enter the time"
              name="time"
              id="time"
              onChange={(e) => {
                setScheduleDto({ ...scheduleDto, time: e.target.value });
              }}
            />
            <br />
            Subject Name
            <select
              className="form-select"
              name=""
              id="sel2"
              onChange={seletedSubjectName}
            >
              <option>--SELECT SUBJECT--</option>
              {subjectList.map((e) => {
                return (
                  <option key={e.id} value={e.subjectName}>
                    {e.subjectName}
                  </option>
                );
              })}
            </select>
            <br />
            <label for="link">Link</label>
            <Input
              type="text"
              placeholder="Enter the link"
              name="link"
              id="link"
              onChange={(e) => {
                setScheduleDto({ ...scheduleDto, link: e.target.value });
              }}
            />
            <br />
            <label for="password">Password</label>
            <Input
              type="password"
              placeholder="Enter the password"
              name="password"
              id="password"
              onChange={(e) => {
                setScheduleDto({ ...scheduleDto, password: e.target.value });
              }}
            />
            <br />
            <Button type="submit" color="primary" outline onClick={formHandler}>
              Add Schedule
            </Button>
            <br />
            <br />
            <Button type="reset" color="success" outline>
              Reset
            </Button>
          </FormGroup>
        </Form>
      </Fragment>
    </div>
  );
};

export default AddSchedule;
