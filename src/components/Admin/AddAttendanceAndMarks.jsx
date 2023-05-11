import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import StudentMarksAttendanceCompoForAdd from "./StudentMarksAttendanceCompoForAdd";

const AddAttendanceAndMarks = () => {
  var [smaDto, setSmaDto] = useState({});
  var x;
  //Function to fetch the course list upon page load
  var [courseList, setCourseList] = useState([]);
  const getCourseList = () => {
    axios.get(`${base_url}/admin/get_all_courses`).then(
      (response) => {
        setCourseList(response.data);
        console.log(response.data);
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
    var selectedElement = document.getElementById("sel1").value;
    setSelectedCourse(selectedElement);
    if (selectedCourse != null) {
      getStudentSubjectList();
    }
  };

  //   Code to fetch the student & subject list after selecting the course name
  var [subjectList, setSubjectList] = useState([]);
  var [studentList, setStudentList] = useState([]);

  const getStudentSubjectList = () => {
    console.log(document.getElementById("sel1").value);
    axios
      .get(
        `${base_url}/admin/get_students_and_subject_list?courseName=${
          document.getElementById("sel1").value
        }`
      )
      .then(
        (response) => {
          setSubjectList(response.data[0]);
          console.log("subjectList: ", response.data[0]);
          setStudentList(response.data[1]);
          console.log("studentList: ", response.data[1]);
        },
        (error) => {
          //error handling
          toast.error("Somthing went wrong !");
          console.log(error);
        }
      );
  };

  // const [selectedStudentName, setSelectedStudentName] = useState({});
  var selectedStudentName; //studentId
  const seletedStudentName = () => {
    console.log("studentId :", document.getElementById("sel2").value);
    var selectedElement3 = document.getElementById("sel2").value;
    alert(selectedElement3);
    selectedStudentName = document.getElementById("sel2").value;
    // setSelectedStudentName(selectedElement3);
    console.log("selectedStudentId", selectedStudentName);
  };
  
  var [selectedSmaDto, setSelectedSmaDto] = useState({});
  var arr1 = [];
  const createSmaDto = () => {
    var selectedSubjectName;
    var selectedCourseId;
    var selectedStudentId;
    for (let i = 0; i < subjectList.length; i++) {
      if (document.getElementById("sel3").value == subjectList[i].id) {
        selectedSubjectName = subjectList[i].subjectName;
        selectedCourseId = subjectList[i].courseId;
        selectedStudentId = selectedStudentName;
      }
    }
    var dto = {
      subjectId: document.getElementById("sel3").value,
      subjectName: selectedSubjectName,
      courseId: selectedCourseId,
      studentId: selectedStudentId,
    };

    arr1.push(dto);
    console.log("arr1:", arr1);
    setSelectedSmaDto({
      subjectId: arr1[0].subjectId,
      subjectName: arr1[0].subjectName,
      courseId: arr1[0].courseId,
      studentId: arr1[0].studentId,
    });
    console.log("selectedSmaDto:", selectedSmaDto);
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
            Select Student
            <select
              className="form-select"
              name=""
              id="sel2"
              onChange={seletedStudentName}
            >
              <option>--SELECT STUDENT--</option>
              {studentList.map((e) => {
                return (
                  <option key={e.name} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            <br />
            Select Subject
            <select
              className="form-select"
              name=""
              id="sel3"
              onChange={createSmaDto}
            >
              <option>--SELECT SUBJECT--</option>
              {subjectList.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.subjectName}
                  </option>
                );
              })}
            </select>
            <br />
            <br />
            <StudentMarksAttendanceCompoForAdd
              transientSmaDto={selectedSmaDto}
            />
          </FormGroup>
        </Form>
      </Fragment>
    </div>
  );
};
export default AddAttendanceAndMarks;
