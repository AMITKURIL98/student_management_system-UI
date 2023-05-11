import React from "react";
import { Card, CardBody } from "reactstrap";

const Header = () => {
  return (
    <div>
      <Card className="bg-info">
        <CardBody>
          <h1 className="headerClass bg-info">Student Management System</h1>
          {/* <button class="glow-on-hover text-center headerClass" type="button">Student Portal Application</button> */}
          {/* <p>
            “Portal” is a web system that provides the functions and features to
            authenticate and identify the student and provide them with an easy,
            intuitive, personalized and user-customizable web-interface for
            facilitating access to information and services that are of primary
            relevance and interests to the student
          </p> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default Header;
