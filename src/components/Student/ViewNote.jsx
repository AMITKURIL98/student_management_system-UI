import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ViewPdf from "./ViewPdf";

const ViewNote =() =>{

    var [notesDto, setNotesDto]= useState();

    useEffect(() => {
        getStudentSubjectList();
      }, []);

      //   Code to fetch the student & subject list after selecting the course name
    var [subjectList, setSubjectList] = useState([]);
    var [studentList, setStudentList] = useState([]);

    const getStudentSubjectList = () => {
        //console.log(document.getElementById("sel1").value);
        axios
            .get(
                `${base_url}/admin/get_students_and_subject_list?courseName=${localStorage.getItem("courseNameToken").toString()}`
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
                    toast.error("Notes not found !");
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

    var [obj,setObj]= useState({
        subjectId : "",
        uploadDate : "",
        notesFile : ""
    });

      const formHandler= ()=>{

        const data={
            subjectId:selectedSubjectId,
            uploadDate:notesDto.uploadDate

        }
        console.log(data);
        addPostToServer(data)

      }

      const addPostToServer=(data)=>{
        axios.post(
            `${base_url}/student/view_notes`, data
        )
        .then(
            (response) => {
                console.log(response.data);
                // setObj(response.data);
                setObj({
                    subjectId : response.data.subjectId,
                    uploadDate : response.data.uploadDate,
                    notesFile : response.data.notesFile
                })
                
            },
            (error) => {
                //error handling
                toast.error("Somthing went wrong !");
                console.log(error);
                setObj({
                    subjectId : "",
                    uploadDate : "",
                    notesFile : ""
                })
            }
        );
        if(obj !=null){
            console.log("in if block")
            return obj.notesFile;
        }

        document.getElementById("spanId").innerHTML="";
      }

      const fun=()=>{
            return  obj.notesFile;
      }

    return(
        <div>
        <ToastContainer />
        <Fragment>
            <Form>
                <FormGroup>
                    <br></br>
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
                    <Button color="primary" outline onClick={formHandler}>
                        View Notes
                    </Button>
                    <br />
                    <br />
                    <Button type="reset" color="success" outline>
                        Reset
                    </Button>
                    <br />
                    <br />  
                </FormGroup>
            </Form>
        </Fragment> 
        {/* <embed src={"data:application/pdf;base64," + obj.notesFile} type="" /> */}

        <ViewPdf pdfreader={obj} ></ViewPdf>                         
    </div>
    );

}
export default ViewNote;