import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { useToggle } from "../CustomHooks/useToggle";

export function PasswordReset() {
  const navigate = useNavigate();
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorState, setErrorState] = useState("");
  const [eye, setEye] = useToggle(false);
  const strongRejex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");

  function handleNewPassword(event) {
    setnewPassword(event.target.value);

    if (strongRejex.test(event.target.value)) {
      setErrorState("");
    } else {
      setErrorState(
        "Your password must contain atleast one uppercase alphabet and number"
      );
    }
  }
  function handleconfirmPassword(event) {
    setconfirmPassword(event.target.value);

    if (newPassword !== event.target.value) {
      setErrorState("Your Password Does Not Match");
    } else {
      setErrorState("");
    }
  }

  function buttonHandler(e) {
    navigate("/login");
  }

  return (
    <div>
      <div className=" form-box card  padding-one flex-gap vertical-card  card-shadow">
        <div className="medium-text bold-text">Reset password</div>
        <form>
          <label className="small-text bold-text">New password</label>
          <br />
          <br />
          <div className="input-box-container bg-white">
            <input
              type="text"
              value={newPassword}
              onChange={handleNewPassword}
            ></input>
          </div>
          <br />

          <label type="text" className="small-text bold-text">
            Confirm password
          </label>
          <br />
          <br />
          <div className="input-box-container bg-white">
            <input
              type={eye ? "text" : "password"}
              value={confirmPassword}
              onChange={handleconfirmPassword}
            ></input>
            <div onClick={setEye}>
              {eye ? <HiEyeOff color="grey" /> : <HiEye color="grey" />}
            </div>
          </div>

          <br />
          <div className="smallest-text red">{errorState}</div>
          <br />
          <button
            class="primary-btn curved-edge-btn"
            onClick={() => buttonHandler()}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
