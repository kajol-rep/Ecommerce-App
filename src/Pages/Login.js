import React from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/authProvider";
import { useInputValue } from "../CustomHooks/useInputValue";

export function Login() {
  const { loginUserWithCredentials, errorMessage } = useAuth();

  const [email, setEmail] = useInputValue("");
  const [password, setPassword] = useInputValue("");

  function buttonHandler() {
    loginUserWithCredentials(email, password);
  }

  return (
    <div>
      <div className=" form-box card  padding-one flex-gap vertical-card  card-shadow">
        <div className="medium-text bold-text">Sign-In</div>
        <label className="small-text bold-text">Email</label>

        <input
          type="email"
          value={email}
          onChange={setEmail}
          className="input-box-container bg-white"
        ></input>

        <label type="text" className="small-text bold-text">
          Password
        </label>
        <div>
          <input
            type="password"
            value={password}
            onChange={setPassword}
            className="input-box-container width-full bg-white"
          ></input>
        </div>
        <div className="smallest-text red">{errorMessage}</div>
        <button
          class="primary-btn curved-edge-btn"
          onClick={() => buttonHandler()}
        >
          Continue
        </button>
        <Link className="link-btn red" to="/reset-password">
          {" "}
          Forgot your password?
        </Link>
        <div className="light-border"></div>
        <div>Not registered yet?</div>

        <Link style={{ color: "white" }} to="/register">
          Create An Account Here
        </Link>
      </div>
    </div>
  );
}
