import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Component } from "react";

const AddUser = () => {
  return (
    <div>
      <form action="">
        Email
        <input type="text" />
        Password
        <input type="text" />
        Role
        <input type="text" />
        <input type="text" />
      </form>
    </div>
  );
};

export default AddUser;
