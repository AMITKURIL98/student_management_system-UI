import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AddFaculty = () => {
  var [facultyDto, setFacultyDto] = useState();
  var [userDetails, setUserDetails] = useState();

  var [obj, setObj] = useState([]);
  const getSubjectList = () => {
    axios.get(`${base_url}/admin/get_course_name_and_subject_name_list`).then(
      (response) => {
        setObj(response.data[1]);
      },
      (error) => {
        //error handling
        toast.error("Somthing went wrong !");
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getSubjectList();
  }, []);

  const [selectedSubjectName, setSelectedSubjectName] = useState({});

  const formHandler = (event) => {
    event.preventDefault();
    // console.log(role);

    const data = {
      emailId: facultyDto.emailId,
      password: facultyDto.password,
      role: "FACULTY",
      subjectName: selectedSubjectName,
      userDetails: {
        city: userDetails.city,
        country: userDetails.country,
        name: userDetails.name,
        phoneNumber: userDetails.phoneNumber,
        state: userDetails.state,
        zipCode: userDetails.zipCode,
      },
    };

    console.log("data:", data);
    addPostToServer(data);
  };

  const addPostToServer = (data) => {
    axios.post(`${base_url}/admin/add_user`, data).then(
      (response) => {
        //response from server
        console.log(response.data);
        toast.success("Faculty Added Successfully !");
      },
      (error) => {
        //error handling
        console.log(error);
      }
    );
  };

  const seletedSubjectName = () => {
    var selectedElement = document.getElementById("sel1");
    alert(selectedElement.value);
    setSelectedSubjectName(selectedElement.value);
    setFacultyDto({ ...facultyDto, subjectName: selectedElement.value });
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
                type="text"
                placeholder="email id"
                name="emailId"
                id="emailId"
                onChange={(e) => {
                  setFacultyDto({ ...facultyDto, emailId: e.target.value });
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
                  setFacultyDto({ ...facultyDto, password: e.target.value });
                }}
              />
              <br />
             
              Subject Name
              <select
                className="form-select"
                name=""
                id="sel1"
                onChange={seletedSubjectName}
              >
                <option>--SELECT SUBJECT--</option>
                {obj.map((e) => {
                  return (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
              <br />
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

export default AddFaculty;
