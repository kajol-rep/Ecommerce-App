import React from "react";
import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiHeart,
  HiStar
} from "react-icons/hi";

import Badge from "../Components/Badge";
import { Link } from "react-router-dom";
import { useData } from "../Contexts/dataProvider";
import Modal from "../Components/Modal";
import { useAuth } from "../Contexts/authProvider";
import { LoginModal } from "../Components/LoginModal";
import {
  calculateDiscount,
  checkIfProductExistsInList,
  formatString
} from "../util";

export function ProductsListing() {
  const {
    state: {
      products,
      wishListItems,
      searchedItems,
      showInventoryAll,
      showFastDeliveryOnly,
      sortBy
    },
    addToCart,
    addToWishList,
    open,
    setOpen,
    handleClose,
    dispatch
  } = useData();
  const { login } = useAuth();

  const getSortedData = (items, sortBy, searchedItems) => {
    if (searchedItems.length === 0) {
      if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
        return items.sort((a, b) => b.price - a.price);
      }
      if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
        return items.sort((a, b) => a.price - b.price);
      }
      return items;
    } else {
      console.log(searchedItems);
      if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
        return searchedItems.sort((a, b) => b.price - a.price);
      }
      if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
        return searchedItems.sort((a, b) => a.price - b.price);
      }
      return searchedItems;
    }
  };

  function getFilteredData(
    productList,
    { showFastDeliveryOnly, showInventoryAll }
  ) {
    return productList
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ inStock }) => (showInventoryAll ? true : inStock));
  }

  const sortedData = getSortedData(products, sortBy, searchedItems);
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showInventoryAll
  });

  return (
    <div className="padding3-left-right">
      <div className="grid gc2-for-productlist ">
        {open === "sort" && (
          <Modal open={open} onClose={handleClose} dismissable>
            <div className="height-half">
              <div className="bold-text ">Sort by price</div>
              <hr className="padding-top-5 " />
              <div className="padding-bottom-5"></div>
              <label>
                <input
                  type="radio"
                  name="sort2"
                  onChange={() =>
                    dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
                  }
                  checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
                ></input>
                Price - High to Low
              </label>
              <br />

              <label>
                {" "}
                <input
                  type="radio"
                  name="sort2"
                  onChange={() =>
                    dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
                  }
                  checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
                ></input>
                Price - Low to High
              </label>
            </div>
          </Modal>
        )}
        {open === "filter" && (
          <Modal open={open} onClose={handleClose} dismissable>
            <div className="height-half">
              <div className="bold-text ">Availability</div>
              <hr className="padding-top-5 " />
              <div className="padding-bottom-5"></div>
              <label>
                <input
                  type="checkbox"
                  checked={showInventoryAll}
                  onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
                ></input>
                Include Out Of Stock
              </label>
              <br />
              <hr className="padding-top-5 " />
              <div className="bold-text padding-top-5 ">Delivery</div>
              <hr className="padding-top-5 " />
              <div className="padding-bottom-5"></div>
              <label>
                <input
                  type="checkbox"
                  checked={showFastDeliveryOnly}
                  onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
                ></input>
                Fast Delivery Only
              </label>
            </div>
          </Modal>
        )}
        <div className="mobile-mode">
          <div style={{ display: "flex" }} className=" sort-filter-box ">
            <div
              className="flex-row pointer flex-grow-one bold-text"
              onClick={() => setOpen("sort")}
            >
              SORT
            </div>

            <div
              className="flex-row pointer flex-grow-one bold-text"
              onClick={() => setOpen("filter")}
            >
              FILTER
            </div>
          </div>
        </div>
        <div className="light-border desktop-mode cw">
          <div className="bold-text padding-one">SORT </div>
          <hr />
          <div className=" padding-one">
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
                }
                checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
              ></input>
              Price - High to Low
            </label>
            <br />

            <label>
              {" "}
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
                }
                checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
              ></input>
              Price - Low to High
            </label>
          </div>
          <hr />
          <div className="bold-text padding-one">FILTERS</div>
          <hr />
          <div className=" padding-one">
            <label>
              <input
                type="checkbox"
                checked={showInventoryAll}
                onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
              ></input>
              Include Out Of Stock
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={showFastDeliveryOnly}
                onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
              ></input>
              Fast Delivery Only
            </label>
          </div>
        </div>

        <ul className="flex-row flex-wrap flex-gap">
          {filteredData.map((productItem) => (
            <li className="position-relative" key={productItem.id}>
              <div
                className="card cw
                vertical-card text-center card-shadow  
                "
              >
                <div className="img-container card-image">
                  <Link className="link-btn" to={`/product/${productItem.id}`}>
                    <img alt="dress-img" src={productItem.image} />
                  </Link>
                  <div className="thumbnail">
                    <button
                      className="floating-action-btn round-btn bottom-right-btn "
                      onClick={() =>
                        login
                          ? addToWishList(productItem)
                          : setOpen("login-modal")
                      }
                    >
                      {checkIfProductExistsInList(
                        wishListItems,
                        productItem.id
                      ) ? (
                        <HiHeart size="1rem" color="red" />
                      ) : (
                        <HiOutlineHeart size="1rem" />
                      )}
                    </button>
                    <span className="floating-action-btn rating-badge">
                      <Badge variant="success" shape="square">
                        <div className="flex-row">
                          <HiStar size="15px" />
                          {productItem.rating}
                        </div>
                      </Badge>
                    </span>
                  </div>
                </div>
                <Link className="link-btn" to={`/product/${productItem.id}`}>
                  <div className="padding-one">
                    <strong>{formatString(productItem.name)}</strong>

                    <div className="padding-top">
                      <strong>Rs.{productItem.price}</strong>{" "}
                      {productItem.oldPrice !== productItem.price && (
                        <span>
                          <span className="strike grey-text">
                            Rs.{productItem.oldPrice}
                          </span>{" "}
                          <span className="red">
                            {calculateDiscount(
                              productItem.price,
                              productItem.oldPrice
                            )}
                            %OFF
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
                {productItem.inStock ? (
                  <button
                    className="primary-btn flex-row flex-gap"
                    onClick={() => addToCart(productItem)}
                  >
                    <HiOutlineShoppingCart /> Add to Cart
                  </button>
                ) : (
                  <button className="primary-btn flex-row disabled flex-gap">
                    Out of Stock
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        {open === "login-modal" && (
          <Modal open={open} onClose={handleClose} dismissable>
            <LoginModal />
          </Modal>
        )}
      </div>
      <div className="container mobile-mode"></div>
    </div>
  );
}
