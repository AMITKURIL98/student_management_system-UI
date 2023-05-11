import axios from "axios";
import base_url from "../Bootapi";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [loginDto, setLoginDto] = useState({});
  // const [userState, setUserState] = useState({});
  var data1 = {};

  const postToServer = (data) => {
    console.log("In axios Handler", loginDto);
    axios.post(`${base_url}/login`, data).then(
      (response) => {
        console.log(response.data);
        // setUserState(response.data);
        data1 = {
          role: response.data.role,
          studentId: response.data.id,
          courseName: response.data.courseName
        };
        console.log("in axios data1", data1);
      },
      (error) => {
        console.log(error);
        toast.error("INVALID LOGIN CREDENTIALS");
      }
    );
  };

  let history = useHistory();

  const loginHandler = (event) => {
    event.preventDefault();
    console.log("In form Handler", loginDto);

    postToServer(loginDto);
    setTimeout(() => {
      console.log("in loginHandler data1", data1);
      console.log("hello");
      if (data1.role === "ADMIN") {
        //set token for authentication
        localStorage.setItem("token", "adminLoggedIn");
        console.log(localStorage.getItem("token").toString())
         Cookies.set("admin",JSON.stringify(data1));
        // Cookies.set("user", JSON.stringify(data1));
        console.log("hi", Cookies.get("admin"));
        console.log(JSON.parse(Cookies.get("admin")));
        history.push("/admin");
      } else if (data1.role === "STUDENT") {
        localStorage.setItem("token", "studentLoggedIn");
        localStorage.setItem("courseNameToken", data1.courseName);
        console.log(localStorage.getItem("token").toString())
        Cookies.set("student",JSON.stringify(data1));
        // Cookies.set("user", JSON.stringify(data1));
        console.log(Cookies.get("student"));
        history.push("/student");
      } else if (data1.role === "FACULTY") {
        localStorage.setItem("token", "facultyLoggedIn");
        console.log(localStorage.getItem("token").toString())
        Cookies.set("faculty",JSON.stringify(data1));
        // Cookies.set("user", JSON.stringify(data1));
        history.push("/faculty");
      } else {
        console.log("Login Failed !");
        // toast.error("Login Failed !");
      }
    }, 1000);
  };

  const token1 = localStorage.getItem("token");
  if (token1 == null) {
    return (
      <div className="logindiv">
        <div class="container">
          <div class="screen">
            <div class="screen__content">
              <form class="login">
                <div class="login__field">
                  <i class="login__icon fas fa-user"></i>
                  <input
                    type="text"
                    class="login__input"
                    placeholder="User name / Email"
                    required
                    onChange={(e) => {
                      setLoginDto({ ...loginDto, email: e.target.value });
                    }}
                  />
                </div>
                <div class="login__field">
                  <i class="login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    class="login__input"
                    placeholder="Password"
                    required
                    onChange={(e) => {
                      setLoginDto({ ...loginDto, password: e.target.value });
                    }}
                  />
                </div>
  
                <button
                  type="submit"
                  onClick={loginHandler}
                  class="button login__submit"
                >
                  <span class="button__text">Log In</span>
                  <i class="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
              <div class="social-login">
                <h3>Log into Student Management System</h3>
              </div>
            </div>
            <div class="screen__background">
              <span class="screen__background__shape screen__background__shape4"></span>
              <span class="screen__background__shape screen__background__shape3"></span>
              <span class="screen__background__shape screen__background__shape2"></span>
              <span class="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if(token1.toString() === "adminLoggedIn"){
    console.log("in admin log in");
    history.push("/admin");
    return(null);
  }
  if(token1.toString() === "studentLoggedIn"){
    history.push("/student");
    return(null);
   }
   if(token1.toString() === "facultyLoggedIn"){
    history.push("/faculty");
    return(null);
   }

};

export default Login;
