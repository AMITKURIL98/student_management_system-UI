// import React, { Fragment } from "react";
// import axios from "axios";
// import base_url from "../../Bootapi";
// import { useState, useEffect } from "react";
// import { Form, FormGroup, Input } from "reactstrap";
// import { Button } from "reactstrap";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// const StudentMarksAndAttendanceComponent = (props) => {
//   var x;
//   const [smaDto, setSmaDto] = useState({});
//   console.log("transientSmaDto", props.transientSmaDto);
//   console.log("arr2", props.arr2);
//   const formHandler = (event) => {
//     event.preventDefault();
//     const data = {

//       subjectId: props.arr2.subjectId,
//       courseId: props.arr2.courseId,
//       studentId: props.arr2.studentId,
//       marks: smaDto.marks,
//       attendance: smaDto.attendance,
//       subjectName: props.arr2.subjectName,
//     };
//     console.log("data:", data);
//     addPostToServer(data);
//    };

//   const addPostToServer = (data) => {
//     axios.post(`${base_url}/admin/add_or_update_attendance`, data).then(
//       (response) => {
//         //response from server
//         console.log(response.data);
//         toast.success("Updated Successfully !");
//       },
//       (error) => {
//         //error handling
//         console.log(error);
//       }
//     );
//   };

//   return (
//     <div>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Subject Id</th>
//             <th>Subject Name</th>
//             <th>Subject Marks</th>
//             <th>Subject Attendance</th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr>
//             <td>
//               <Input
//                 readonly
//                 value={props.arr2.subjectId}
//               ></Input>
//             </td>
//             <td>
//               <Input readonly value={props.arr2.subjectName}></Input>
//             </td>
//             <td>
//               <Input
//                 placeholder={props.arr2.marks}
//                 onChange={(e) => {
//                   setSmaDto({ ...smaDto, marks: e.target.value });
//                 }}
//               ></Input>
//             </td>
//             <td>
//               <Input
//                 placeholder={props.arr2.attendance}
//                 onChange={(e) => {
//                   setSmaDto({ ...smaDto, attendance: e.target.value });
//                 }}
//               ></Input>
//             </td>
//             <td>
//               <Button
//                 type="submit"
//                 color="success"
//                 outline
//                 onClick={formHandler}
//               >
//                 Update
//               </Button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentMarksAndAttendanceComponent;
import React, { Fragment } from "react";
import axios from "axios";
import base_url from "../../Bootapi";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const StudentMarksAndAttendanceComponent = (props) => {
  var x;
  const [smaDto, setSmaDto] = useState({});
  console.log("transientSmaDto", props.transientSmaDto);
  console.log("arr2", props.arr2);
const formHandler = (event) => {
    event.preventDefault();
    const { marks, attendance } = smaDto;

    // Validate marks
    if (marks === undefined || isNaN(marks)||  marks < 0 || marks > 100) {
      toast.error("Please enter a valid marks value between 0 and 100");
      return;
    }

    const data = {
      subjectId: props.arr2.subjectId,
      courseId: props.arr2.courseId,
      studentId: props.arr2.studentId,
      marks,
      attendance,
      subjectName: props.arr2.subjectName,
    };
    console.log("data:", data);
    addPostToServer(data);
  };
  const addPostToServer = (data) => {
    axios.post(`${base_url}/admin/add_or_update_attendance`, data).then(
      (response) => {
        //response from server
        console.log(response.data);
        toast.success("Updated Successfully !");
      },
      (error) => {
        //error handling
        console.log(error);
      }
    );
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Subject Id</th>
            <th>Subject Name</th>
            <th>Subject Marks</th>
            <th>Subject Attendance</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <Input readonly value={props.arr2.subjectId}></Input>
            </td>
            <td>
              <Input readonly value={props.arr2.subjectName}></Input>
            </td>
            <td>
              <Input
                placeholder={props.arr2.marks}
                onChange={(e) => {
                  setSmaDto({ ...smaDto, marks: e.target.value });
                }}
              ></Input>
            </td>
            <td>
              <Input
                placeholder={props.arr2.attendance}
                onChange={(e) => {
                  setSmaDto({ ...smaDto, attendance: e.target.value });
                }}
              ></Input>
            </td>
            <td>
              <Button
                type="submit"
                color="success"
                outline
                onClick={formHandler}
              >
                Update
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentMarksAndAttendanceComponent;