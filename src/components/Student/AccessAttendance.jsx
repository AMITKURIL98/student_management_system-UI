import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input, InputGroup, InputGroupText } from "reactstrap";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const AccessAttendance = () => {
  var [smaDto, setSmaDto] = useState();
  var [obj, setObj] = useState([]);
  var [obj1, setObj1] = useState();
  var [obj2, setObj2] = useState({});

  const getStudentAttendance = () => {
    console.log("cookie", jsonStudentObj.studentId);
     axios
      .get(
        `${base_url}/student/get_subject_attendance?studentId=${jsonStudentObj.studentId}`
      )
      .then(
        (response) => {
          setObj(response.data);
          setObj1(response.data[0].courseName);
          console.log("courseName==", response.data[0]);
          console.log(response.data);
        },
        (error) => {
          //error handling
          toast.error("Attendance Not Found");
          console.log(error);
        }
      );
  };

  var jsonStudentObj;

  useEffect(() => {
    var student = Cookies.get("student");
    console.log("studentAccessResult", student);
    jsonStudentObj = JSON.parse(student);
    console.log(jsonStudentObj);
    setObj2(JSON.parse(student));
    getStudentAttendance();
  }, []);

  return (
    <div>
      <br />
      <button class="glow-on-hover" type="button">
        Course Name: {obj1}
      </button>
      {/* <h3>Course Name: {obj1}</h3> */}
      <table className="table">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Subject Attendance</th>
          </tr>
        </thead>

        <tbody>
          {obj.map((element) => {
            return (
              <tr>
                <td>
                  <InputGroup>
                    <div style={{ width: 400 }}>
                      <InputGroupText>{element.subjectName}</InputGroupText>
                    </div>
                  </InputGroup>
                  {/* <Input readonly value={element.subjectName}></Input> */}
                </td>
                <td>
                  <InputGroup>
                    <div style={{ width: 400 }}>
                      <InputGroupText>{element.attendance}</InputGroupText>
                    </div>
                  </InputGroup>
                  {/* <Input readonly value={element.marks}></Input> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default AccessAttendance;

const Error = ()=>{
    return(
        <div>
            SOMETHING WENT WRONG
        </div>
    )
}

