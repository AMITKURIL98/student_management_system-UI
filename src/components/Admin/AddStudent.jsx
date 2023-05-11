import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AddStudent = () => {
  var [studentDto, setStudentDto] = useState();
  var [userDetails, setUserDetails] = useState();
  var newformData1 = new FormData();
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

  const [role, setRole] = useState("STUDENT");
  const [selectedCourse, setSelectedCourse] = useState({});

  var [filee, setFilee] = useState();
  const fileHandler = (e) => {
    console.log(e.target.files[0]);
    newformData1.append("imageFile", e.target.files[0]);
    // console.log(newformData);

    setFilee(e.target.files[0]);
    //  filee=e.target.files[0];
    console.log(filee);
    for (var pair of newformData1.entries()) {
      console.log(pair[0]);
      console.log(pair);
    }
  };

  const formHandler = (event) => {
    event.preventDefault();
    console.log(role);

    const data = {
      emailId: studentDto.emailId,
      password: studentDto.password,
      role: "STUDENT",
      courseName: selectedCourse,
      userDetails: {
        city: userDetails.city,
        country: userDetails.country,
        name: userDetails.name,
        phoneNumber: userDetails.phoneNumber,
        state: userDetails.state,
        zipCode: userDetails.zipCode,
      },
    };
    addPostToServer({ tUser: JSON.stringify(data), imageFile: filee });
  };

  const addPostToServer = (data) => {
    var againforrm = new FormData();

    againforrm.append("imageFile", data.imageFile);
    againforrm.append("tUser", data.tUser);
    console.log(data);
    axios.post(`${base_url}/admin/add_student`, againforrm).then(
      (response) => {
        //response from server
        console.log(response.data);
        toast.success("Student Added Successfully !");
      },
      (error) => {
        //error handling
        console.log(error);
      }
    );
  };

  const selecttedCourse = () => {
    var selectedElement = document.getElementById("sel1");
    alert(selectedElement.value);
    setSelectedCourse(selectedElement.value);
    setStudentDto({ ...studentDto, courseName: selectedElement.value });
  };

  return (
    <div>
      <div className="studentform">
        <ToastContainer />
        <Fragment>
          <Form>
            <FormGroup>
              <label for="emailId">Email Id</label>
              <Input
                type="email"
                placeholder="email id"
                name="emailId"
                id="emailId"
                onChange={(e) => {
                  setStudentDto({ ...studentDto, emailId: e.target.value });
                }}
              />
              <br />
              <label for="password">Password</label>
              <Input
                type="password"
                placeholder="password"
                name="password"
                id="password"
                onChange={(e) => {
                  setStudentDto({ ...studentDto, password: e.target.value });
                }}
              />
              <br />
              Course Name
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
              <label>File Name</label>
              <Input type="file" onChange={fileHandler}></Input>
              <br />
              <br></br>
              <h2>User Details</h2>
              <br />
              <label for="Name">Name</label>
              <Input
                type="text"
                placeholder="Name"
                name="Name"
                id="Name"
                onChange={(e) => {
                  setUserDetails({ ...userDetails, name: e.target.value });
                }}
              />
              <br />
              <label for="Name">Phone Number</label>
              <Input
                type="text"
                placeholder="phoneNumber"
                name="phoneNumber"
                id="phoneNumber"
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    phoneNumber: e.target.value,
                  });
                }}
              />
              <br />
              <label for="city">City</label>
              <Input
                type="text"
                placeholder="city"
                name="city"
                id="city"
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    city: e.target.value,
                  });
                }}
              />
              <br />
              <label for="state">State</label>
              <Input
                type="state"
                placeholder="state"
                name="state"
                id="state"
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    state: e.target.value,
                  });
                }}
              />
              <br />
              <label for="country">Country</label>
              <Input
                type="country"
                placeholder="country"
                name="country"
                id="country"
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    country: e.target.value,
                  });
                }}
              />
              <br />
              <label for="zipCode">Zip Code</label>
              <Input
                type="zipCode"
                placeholder="zipCode"
                name="zipCode"
                id="zipCode"
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    zipCode: e.target.value,
                  });
                }}
              />
              <br />
              <br />
              <Button color="primary" outline onClick={formHandler}>
                Add User
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
    </div>
  );
};

export default AddStudent;
