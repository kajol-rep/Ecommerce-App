import React, { useState } from "react";
import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiSearch,
  HiOutlineUserCircle
} from "react-icons/hi";
import { Link } from "react-router-dom";

import { useData } from "../Contexts/dataProvider";
import Badge from "./Badge";
import { useAuth } from "../Contexts/authProvider";

export function NavBar() {
  const {
    state: { cartItems, wishListItems },
    dispatch
  } = useData();
  const { login, logoutUser } = useAuth();
  const [itemToSearch, setItemToSearch] = useState("");
  const TotalItemsInCart = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );
  function searchItems() {
    dispatch({ type: "SEARCH_ITEM", payload: itemToSearch });
    setItemToSearch("");
  }

  return (
    <nav>
      <div className="activeNav flex-row flex-gap">
        <div>
          <Link className="nav-header link-btn" to="/">
            <img
              alt="logo"
              className="logo"
              src="https://i.pinimg.com/236x/d7/e6/fe/d7e6fe6c4e540f6468d8638f5008c1d9--pet-logo-cafe-logo.jpg"
            />
            <span className="logo-text" style={{ fontSize: "1.5rem" }}>
              Petso.<span style={{ fontSize: "1rem" }}>com</span>
            </span>
          </Link>
        </div>
        <div className="flex-row flex-grow-one">
          <div className="search-bar">
            <input
              type="search"
              placeholder="Search"
              value={itemToSearch}
              onChange={(event) => setItemToSearch(event.target.value)}
              className="width-full"
            ></input>
          </div>
          <Link className="link-btn" to="/products-listing">
            <button
              className="search-btn simple-btn"
              onClick={() => searchItems()}
            >
              <HiSearch size="1rem" />
            </button>
          </Link>
        </div>
        <div className="tooltip">
          <HiOutlineUserCircle size="2rem" color="black" />
          <div class="tooltiptext light-border card-shadow">
            {login ? (
              <div>
                <div className="small-text bold-text">Hi</div>
                <div className="grey-text small-text">
                  Do you want to logout ?
                </div>
                <br />
                <button
                  onClick={logoutUser}
                  className="primary-btn curved-edge-btn"
                >
                  <Link className="link-btn" to="/login">
                    Logout
                  </Link>
                </button>
              </div>
            ) : (
              <div>
                <div className="small-text bold-text">Welcome</div>
                <div className="grey-text small-text">
                  To access account and manage wishlist and orders
                </div>
                <br />
                <button className="primary-btn curved-edge-btn">
                  <Link className="link-btn" to="/login">
                    Login
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>
        <Link className="link-btn" to="/wishlist">
          <div className="p-relative inline-block">
            <HiOutlineHeart size="2rem" color="black" />{" "}
            {wishListItems.length > 0 && (
              <div
                className="p-absolute 
       top-right-square"
              >
                <Badge shape="capsule">{wishListItems.length}</Badge>
              </div>
            )}
          </div>
        </Link>
        <Link className="link-btn" to="/cart">
          <div className="p-relative inline-block">
            <HiOutlineShoppingCart size="2rem" color="black" />{" "}
            {TotalItemsInCart > 0 && (
              <div
                className="p-absolute 
       top-right-square"
              >
                <Badge shape="capsule">{TotalItemsInCart}</Badge>
              </div>
            )}
          </div>
        </Link>
      </div>

      <div className="flex-row ">
        <div className="mobile-search-bar">
          <input
            type="search"
            placeholder="Search"
            value={itemToSearch}
            onChange={(event) => setItemToSearch(event.target.value)}
            className="width-full"
          ></input>
        </div>
        <div className="">
          <Link className="link-btn" to="/products-listing">
            <button
              className="mobile-search-btn simple-btn"
              onClick={() => searchItems()}
            >
              <HiSearch />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
