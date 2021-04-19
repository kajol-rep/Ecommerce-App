import React from "react";
import Modal from "../Components/Modal";
import { Link } from "react-router-dom";
import { useData } from "../Contexts/dataProvider";
export function LoginModal() {
  return (
    <div className="flex-column">
      <div className="grey-text text-center small-text">
        Login to this site to access your personalised wishlist and cart
        checkout. Just fill in the fields below, and we’ll get a new account set
        up for you in no time. We will only ask you for information necessary to
        make the purchase process faster and easier.
      </div>
      <br />
      <button className="primary-btn curved-edge-btn">
        <Link className="link-btn" to="/login">
          Login
        </Link>
      </button>
    </div>
  );
}
