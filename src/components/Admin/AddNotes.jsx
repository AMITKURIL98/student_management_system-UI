import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AddNotes = () => {

    //Function to fetch the course list upon page load
    var [notesDto, setNotesDto] = useState();
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
                `${base_url}/admin/get_students_and_subject_list?courseName=${document.getElementById("sel1").value
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


    var [selectedSubjectId,setSelectedSubjectId]=useState();
    const selectSubjectId = () => {
        var selectedElement3 = document.getElementById("sel2").value;
        alert(selectedElement3);
        setSelectedSubjectId(document.getElementById("sel2").value)
        //selectedSubjectId = ;
        // selectedSubjectId(selectedElement3);
    };

    var [filee, setFilee] = useState();
    const fileHandler = (e) => {
        console.log(e.target.files[0]);
        setFilee(e.target.files[0])
        console.log(filee);
    }

    const formHandler = (event) => {
        event.preventDefault();
        console.log(notesDto)
        console.log(selectedSubjectId)
        const data1 = {
            subjectId:selectedSubjectId,
            uploadDate:notesDto.uploadDate
        };
        console.log("data ="+data1)
        addPostToServer({tNotesData : JSON.stringify(data1), notesFile : filee});
      };
    
      const addPostToServer = (data) => {
        var againforrm = new FormData();
        
        againforrm.append("notesFile",data.notesFile);
        againforrm.append("tNotesData",data.tNotesData);
        console.log(data)
        axios.post(`${base_url}/admin/add_notes`,againforrm).then(
          (response) => {
            //response from server
            console.log(response.data);
            toast.success("Notes Added Successfully !");
          },
          (error) => {
            //error handling
            toast.error("File size should be less than 1 MB");
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
                            onChangeCapture={selecttedCourse}
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

                        Select Subject
                        <select
                            className="form-select"
                            name=""
                            id="sel2"
                            onChange={selectSubjectId}
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
                        <label for="date">Date</label>
                        <Input
                            type="date"
                            placeholder="Enter the date"
                            name="date"
                            id="date"
                            onChange={(e) => {
                                setNotesDto({ ...notesDto, uploadDate: e.target.value });
                            }}
                        />
                        <br />
                        <br />
                        <label>File Name</label>
                        <Input type="file" onChange={fileHandler}></Input>
                        <br />
                        <br />
                        <Button color="primary" outline onClick={formHandler}>
                            Add Note
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
}

export default AddNotes;