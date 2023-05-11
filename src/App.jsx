import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import AdminFrontPage from "./AdminFrontPage";
import StudentFrontPage from "./StudentFrontPage";
import FacultyFrontPage from "./FacultyFrontPage";

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
        </Switch>
        <Switch>
        <Route path="/admin" exact component={AdminFrontPage}></Route>
        </Switch>
        <Switch>
        <Route path="/student" exact component={StudentFrontPage}></Route>
        </Switch>
        <Switch>
        <Route path="/faculty" exact component={FacultyFrontPage}></Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
