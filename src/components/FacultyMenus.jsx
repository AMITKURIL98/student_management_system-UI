import { Link } from "react-router-dom";
import { ListGroup } from "reactstrap";

const FacultyMenus = () => {
  return (
    <ListGroup>
      <Link className="list-group-item list-group-item-action" tag="a" to="/home2">
        Home
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

export default FacultyMenus;
