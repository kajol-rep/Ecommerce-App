import React from "react";

import { Link } from "react-router-dom";

export function Register() {
  return (
    <div>
      <div className=" form-box card padding-one flex-gap vertical-card card-shadow">
        <div className="medium-text bold-text">Create Account</div>
        <label className="small-text bold-text">Name </label>
        <input type="text" className="input-box-container bg-white"></input>

        <label className="small-text bold-text">Email </label>
        <input type="email" className="input-box-container bg-white"></input>

        <label className="small-text bold-text">Mobile number </label>
        <input type="number" className="input-box-container bg-white"></input>

        <label className="small-text bold-text">Password </label>
        <input type="text" className="input-box-container bg-white"></input>

        <button class="primary-btn curved-edge-btn">Continue</button>

        <div className="light-border"></div>
        <div>Already have an account?</div>

        <Link style={{ color: "white" }} to="/login">
          Sign-In Here
        </Link>
      </div>
    </div>
  );
}
