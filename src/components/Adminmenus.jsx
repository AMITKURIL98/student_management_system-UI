import { Link } from "react-router-dom";
import { ListGroup } from "reactstrap";

const Adminmenus = () => {
  return (
    <ListGroup>
      <Link className="list-group-item list-group-item-action" tag="a" to="/home">
        Home
      </Link>
      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/add_student"
      >
        Add Student
      </Link>
      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/add_faculty"
      >
        Add Faculty
      </Link>
      
      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/add_admin"
      >
        Add Admin
      </Link>

      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/add_new_course"
      >
        Add New Course 
      </Link>

      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/update_course"
      >
        Update Course
      </Link>

      
      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/add_schedule"
      >
        Add New Schedule
        </Link>

        <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/update_schedule"
      >
        Update Schedule
      </Link>

      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/update_attendance_marks"
      >
        Update Attendance And Marks
      </Link>

      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/add_attendance_marks"
      >
        Add Attendance And Marks
      </Link>

      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/add_notes"
      >
        Add Notes
      </Link>

      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/logout"
      >
        Logout
      </Link>


    </ListGroup>
  );
};

export default Adminmenus;
