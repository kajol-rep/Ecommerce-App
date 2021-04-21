import React from "react";

import { Link } from "react-router-dom";

export function Register() {
  return (
    <div>
      <div className=" form-box card padding-one flex-gap vertical-card card-shadow">
        <div className="medium-text bold-text">Create Account</div>
        <form>
          <label className="small-text bold-text">Name </label>
          <div className="input-box-container bg-white">
            <input type="text"></input>
          </div>

          <br />

          <label className="small-text bold-text">Email </label>
          <div className="input-box-container bg-white">
            <input type="email"></input>
          </div>

          <br />
          <label className="small-text bold-text">Mobile number </label>
          <div className="input-box-container bg-white">
            <input type="number"></input>
          </div>

          <br />
          <label className="small-text bold-text">Password </label>
          <div className="input-box-container bg-white">
            <input type="password"></input>
          </div>

          <br />
          <button class="primary-btn curved-edge-btn">Continue</button>
        </form>
        <div className="light-border"></div>
        <div>Already have an account?</div>

        <Link style={{ color: "white" }} to="/login">
          Sign-In Here
        </Link>
      </div>
    </div>
  );
}
