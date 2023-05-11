import { Link } from "react-router-dom";
import { ListGroup } from "reactstrap";

const StudentMenus = () => {
  return (
    <ListGroup>
      <Link className="list-group-item list-group-item-action" tag="a" to="/home1">
        Home
      </Link>

      <Link className="list-group-item list-group-item-action" tag="a" to="/view_schedule">
        View Schedule
      </Link>

      <Link className="list-group-item list-group-item-action" tag="a" to="/get_subject_marks">
        Access Result
      </Link>

      <Link className="list-group-item list-group-item-action" tag="a" to="/get_subject_attendance">
        Access Attendance
      </Link>

      <Link className="list-group-item list-group-item-action" tag="a" to="/view_profile">
        View Student Profile
      </Link>

      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/update_student"
      >
        Update Profile
      </Link>

      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/view_notes"
      >
        View Notes
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

export default StudentMenus;
