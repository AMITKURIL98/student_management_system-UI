import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AddAdmin = () => {
  var [adminDto, setAdminDto] = useState();
  var [userDetails, setUserDetails] = useState();
  const formHandler = (event) => {
    event.preventDefault();
    // console.log(role);

    const data = {
      emailId: adminDto.emailId,
      password: adminDto.password,
      role: "ADMIN",
      userDetails: {
        city: userDetails.city,
        country: userDetails.country,
        name: userDetails.name,
        phoneNumber: userDetails.phoneNumber,
        state: userDetails.state,
        zipCode: userDetails.zipCode
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
        toast.success("Admin Added Successfully !");
      },
      (error) => {
        //error handling
        console.log(error);
      }
    );
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
                  setAdminDto({ ...adminDto, emailId: e.target.value });
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
                    setAdminDto({ ...adminDto, password: e.target.value });
                }}
              />
              <br />
              
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

export default AddAdmin;

