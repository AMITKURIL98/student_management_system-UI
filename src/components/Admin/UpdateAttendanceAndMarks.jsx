import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import StudentMarksAndAttendanceComponent from "./StudentMarksAndAttendanceComponent";

const UpdateAttendanceAndMarks = () => {
  var [smaDto, setSmaDto] = useState();
  const [selected, setSelected] = useState("");
  var x =-1;
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

var [selectedSmaDto, setSelectedSmaDto] = useState({});
var [arr1, setArr1] = useState({});
var dto;
  var renderNewCompo = () => {
    
    console.log("in renderNewCompo fun");
    console.log("list in renderNewCompo fun", studentMarksAndAttListl);
    for (let i = 0; i < studentMarksAndAttListl.length; i++) {
      console.log("in for");
      console.log("val", document.getElementById("sel3").value);
      var abc = document.getElementById("sel3").value;
      // console.log("subId", studentMarksAndAttListl[i].subjectId);
      if (document.getElementById("sel3").value == studentMarksAndAttListl[i].subjectId) {
        console.log("in if");
        x = i;
          setArr1({
            subjectId: abc,
            courseId: studentMarksAndAttListl[i].courseId,
            studentId: studentMarksAndAttListl[i].studentId,
            marks: studentMarksAndAttListl[i].marks,
            attendance: studentMarksAndAttListl[i].attendance,
            subjectName: studentMarksAndAttListl[i].subjectName,
          })
      }
      }
      console.log("x", x);
      if(x==-1){
        toast.warning("Record not found for selected subject..try adding");
    }
    
    var len = arr1.length;
    // console.log("selectedSmaDto", selectedSmaDto)
    console.log("arr1", arr1);
    setSelectedSmaDto({
      subjectId: arr1[0].subjectId,
      courseId: arr1[0].courseId,
      studentId: arr1[0].studentId,
      marks: arr1[0].marks,
      attendance: arr1[0].attendance,
      subjectName: arr1[0].subjectName,
    })
    // arr1.pop();
    // console.log("arr1 after clearing", arr1);
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
    if (selectedStudentName != null) {
      getStudentMarksAndAttList();
    }
  };

  //axios request to get the student marks and attendance list by studentID
  var [studentMarksAndAttListl, setStudentMarksAndAttListl] = useState([]);
  var studentMarksAndAttList = [];
  const getStudentMarksAndAttList = () => {
    axios
      .get(
        `${base_url}/admin/get_marks_and_attendance_by_student_id?studentId=${selectedStudentName}`
      )
      .then(
        (response) => {
          console.log("in getStudentMarksAndAttList", selectedStudentName);
          // setStudentMarksAndAttList(response.data);
          if (response.data[0] == null) {
            toast.warning(
              "No marks/attendance record present for this student !"
            );
          }
          for (let i = 0; i < response.data.length; i++) {
            studentMarksAndAttList.push(response.data[i]);
            console.log("list", studentMarksAndAttList[i].marks);
          }
          // setStudentMarksAndAttListl(studentMarksAndAttList);
          setStudentMarksAndAttListl(response.data);
          console.log("studentMarksAndAttList", studentMarksAndAttList);
          console.log("setStudentMarksAndAttListl", setStudentMarksAndAttListl);
        },
        (error) => {
          //error handling
          toast.error("Somthing went wrong !");
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
              onChangeCapture ={selecttedCourse}
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
              onChangeCapture={seletedStudentName}
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
              onChange ={renderNewCompo}
              // onSelect={renderNewCompo(studentMarksAndAttList)}
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
            <StudentMarksAndAttendanceComponent
              transientSmaDto={selectedSmaDto} arr2 = {arr1}
            />
          </FormGroup>
        </Form>
      </Fragment>
    </div>
  );
};

export default UpdateAttendanceAndMarks;
