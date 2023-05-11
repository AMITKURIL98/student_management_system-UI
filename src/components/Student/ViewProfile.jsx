import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState, useEffect } from "react";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Form, FormGroup, Input, InputGroup, InputGroupText } from "reactstrap";
import Cookies from "js-cookie";

const ViewProfile=()=>{
  var studId = JSON.parse(Cookies.get("student")).studentId;
  console.log("student id on view profile", studId);
    var [obj, setObj] = useState({});
    var [obj2, setObj2] = useState({});
    var [obj3, setObj3] = useState({});
    var [userData, setUserData] = useState({});
    const getSubjectList = () => {
      axios.get(`${base_url}/student/student_details/${studId}`).then(
        (response) => {
          setObj(response.data);
            setObj2(response.data.userDetails); 
            setObj3(obj.course)
            console.log(obj); 
          console.log(obj.userDetails);
          setUserData(response.data);

        //   console.log(obj);
        //     console.log(response.data);
        //     imageurl="data:image/jpeg;base64,"+response.data.image;
        //     console.log(imageurl) 
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

    return(
        <div> 
            <br></br>
            <br></br>
            <img src={"data:image/jpeg;base64,"+obj.image} alt="" className="rounded mx-auto d-block myProfile"/>
            <br></br>
            <br></br>
            <br></br>
            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>CourseName :</InputGroupText>
              </div>
              <Input type="text" value={userData.course} readOnly></Input>
            </InputGroup>

            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>Name :</InputGroupText>
              </div>
              <Input type="text" value={obj2.name} readOnly></Input>
            </InputGroup>

            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>Phone Number :</InputGroupText>
              </div>
              <Input type="text" value={obj2.phoneNumber} readOnly></Input>
            </InputGroup>


            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>City :</InputGroupText>
              </div>
              <Input type="text" value={obj2.city} readOnly></Input>
            </InputGroup>

            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>State :</InputGroupText>
              </div>
              <Input type="text" value={obj2.state} readOnly></Input>
            </InputGroup>

            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>Country :</InputGroupText>
              </div>
              <Input type="text" value={obj2.country} readOnly></Input>
            </InputGroup>

            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>ZipCode :</InputGroupText>
              </div>
              <Input type="text" value={obj2.zipCode} readOnly></Input>
            </InputGroup>


        </div>
    );

}
export default ViewProfile;