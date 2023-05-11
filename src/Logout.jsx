import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
function Logout(props) {
  const token1 = localStorage.removeItem("token");
  localStorage.removeItem("courseNameToken")
  window.location.href='/';
  return;
}

export default Logout;
