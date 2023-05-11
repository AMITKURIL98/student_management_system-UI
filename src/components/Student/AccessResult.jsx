import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input, InputGroup, InputGroupText } from "reactstrap";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const AccessResult = () => {
  var [smaDto, setSmaDto] = useState();

  var [obj, setObj] = useState([]);
  var [obj1, setObj1] = useState();
  var [obj2, setObj2] = useState({});

  const getStudentMarks = () => {
    console.log("cookie", jsonStudentObj.studentId);

    axios
      .get(
        `${base_url}/student/get_subject_marks?studentId=${jsonStudentObj.studentId}`
      )
      .then(
        (response) => {
          setObj(response.data);
          console.log("courseName", response.data[0].courseName);
          setObj1(response.data[0].courseName);
          console.log(response.data);
        },
        (error) => {
          //error handling
          toast.error("Marks Not Found");
          console.log(error);
        }
      );
  };

  //   var student;
  var jsonStudentObj;

  useEffect(() => {
    var student = Cookies.get("student");
    console.log("studentAccessResult", student);
    jsonStudentObj = JSON.parse(student);
    console.log(jsonStudentObj);
    setObj2(JSON.parse(student));
    getStudentMarks();
  }, []);

  return (
    <div>
      <br></br>
      <button class="glow-on-hover" type="button">
        Course Name: {obj1}
      </button>
      {/* <h3>Course Name: {obj1}</h3> */}
      <br />
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Subject Marks</th>
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
                        <InputGroupText>{element.marks}</InputGroupText>
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
    </div>
  );
};

export default AccessResult;
