import { Button } from "reactstrap";

const Home = () => {
  return (
    <div>
      <div className="homeDiv">
        <br />
        <h2 class="text-center">STUDENT MANAGEMENT SYSTEM</h2>
        
        <br />
        <h5>
          <i>
            “STUDENT MANAGEMENT SYSTEM” is a web system that provides the functions and features to
            authenticate and identify the student and provide them with an easy,
            intuitive, personalized and user-customizable web-interface for
            facilitating access to information and services that are of primary
            relevance and interests to the student
          </i>
        </h5>
        <br />
        <div class="col-md-12 text-center">
          
          <Button color="primary text-center" outline>
            Start using
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
