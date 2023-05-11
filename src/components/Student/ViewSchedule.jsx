import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input, InputGroup, InputGroupText } from "reactstrap";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ViewSchedule = () => {
  const [scheduleDto, setScheduleDto] = useState([]);

  var data1;
  const getSchedule = () => {
    axios.get(`${base_url}/student/view_schedule`).then(
      (response) => {
        setScheduleDto(response.data);
        console.log(response.data);
        toast.success("Loaded Schedule Successfully !");
      },
      (error) => {
        toast.error("Somthing went wrong !");
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <div>
     
      {scheduleDto.map((e) => {
        return (
          <div >
            <InputGroup >
            <div style={{width:200}}>
              <InputGroupText>Date :</InputGroupText>
              </div>
            
              <Input value={e.date} readOnly></Input>
              
            </InputGroup>

            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>Link :</InputGroupText>
              </div>
              <Input value={e.link} readOnly></Input>
            </InputGroup>

            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>Password :</InputGroupText>
              </div>
              <Input value={e.password} readOnly></Input>
            </InputGroup>

            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>Subject Name :</InputGroupText>
              </div>
              <Input value={e.subjectName} readOnly></Input>
            </InputGroup>

            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>Time :</InputGroupText>
              </div>
              <Input value={e.time} readOnly></Input>
            </InputGroup>

            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>Faculty Id :</InputGroupText>
              </div>
              <Input value={e.facultyId} readOnly></Input>
            </InputGroup>

            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>Subject Id :</InputGroupText>
              </div>
              <Input value={e.subjectId} readOnly></Input>
            </InputGroup>

            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>Recorded Session Link :</InputGroupText>
              </div>
              <Input value={e.recordedSessionLink} readOnly></Input>
            </InputGroup>

            <InputGroup>
            <div style={{width:200}}>
              <InputGroupText>Recorded Password :</InputGroupText>
              </div>
              <Input value={e.recordedPassword} readOnly></Input>
            </InputGroup>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default ViewSchedule;
