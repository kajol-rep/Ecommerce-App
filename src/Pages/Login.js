import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/authProvider";
import { useInputValue } from "../CustomHooks/useInputValue";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { useToggle } from "../CustomHooks/useToggle";
export function Login() {
  const { loginUserWithCredentials, errorMessage } = useAuth();
  const [eye, setEye] = useToggle(false);
  const [email, setEmail] = useInputValue("");
  const [password, setPassword] = useInputValue("");

  function buttonHandler(event) {
    loginUserWithCredentials(email, password);
    event.preventDefault();
  }

  return (
    <div>
      <div className=" form-box card  padding-one flex-gap vertical-card  card-shadow">
        <div className="medium-text bold-text">Sign-In</div>
        <form>
          <label className="small-text bold-text">Email</label>

          <div className="input-box-container bg-white">
            <input type="email" value={email} onChange={setEmail}></input>
          </div>
          <br />

          <label type="text" className="small-text bold-text">
            Password
          </label>

          <div className="input-box-container bg-white">
            <input
              type={eye ? "text" : "password"}
              value={password}
              onChange={setPassword}
            ></input>
            <div onClick={setEye}>
              {eye ? <HiEyeOff color="grey" /> : <HiEye color="grey" />}
            </div>
          </div>
          <div className="smallest-text red">{errorMessage}</div>
          <br />
          <button
            class="primary-btn curved-edge-btn"
            onClick={(event) => buttonHandler(event)}
          >
            Continue
          </button>
        </form>
        <Link className="link-btn red" to="/reset-password">
          {" "}
          Forgot your password?
        </Link>
        <div className="light-border"></div>
        <div>Not registered yet?</div>

        <Link className="white" to="/register">
          Create An Account Here
        </Link>
      </div>
    </div>
  );
}
