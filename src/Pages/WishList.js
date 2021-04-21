import React from "react";
import { useData } from "../Contexts/dataProvider";
import { Link } from "react-router-dom";

export function WishList() {
  const {
    state: { wishListItems },
    addToCartFromWishlist,
    dispatch
  } = useData();

  return (
    <div className="padding3-left-right">
      {wishListItems.length > 0 ? (
        <div className="grey-text text-center medium-text padding-one">
          You have {wishListItems.length}{" "}
          {wishListItems.length > 1 ? <span>items</span> : <span>item</span>} in
          your wishlist
        </div>
      ) : (
        <div
          style={{ margin: "auto auto", width: "290px" }}
          className=" vertical-card"
        >
          <div className="img-container">
            <img
              alt="dog"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41ziSjhxV94vl9Q9izqh0qZeUlA7ynUbEWaXTJrnAzv1PNlnxUsut5cFdcDksbapvPiU&usqp=CAU"
            />
          </div>
          <div>
            <div className="medium-text">Your wish list is empty</div>
            <br />
            <button className="primary-btn curved-edge-btn">
              <Link className="link-btn" to="/products-listing">
                Go Add Items
              </Link>
            </button>
          </div>
        </div>
      )}
      <ul>
        {wishListItems.map((wishListItem) => (
          <li className="light-border " key={wishListItem.id}>
            <div
              className=" gc2-wishlist
                 horizontal-card text-center"
            >
              <div
                style={{ width: "200px", height: "150px" }}
                className="img-container"
              >
                <Link to={`/product/${wishListItem.id}`}>
                  <img
                    style={{ height: "100%", width: "100%" }}
                    alt="dress-img"
                    src={wishListItem.image}
                  />
                </Link>
              </div>
              <div className="padding-one">
                <Link className="link-btn" to={`/product/${wishListItem.id}`}>
                  <strong>{wishListItem.name}</strong>
                  <div>Rs.{wishListItem.price} </div>
                  {wishListItem.inStock && (
                    <div className="green"> In Stock </div>
                  )}
                  {!wishListItem.inStock && (
                    <div className="red"> Out of Stock </div>
                  )}
                  {wishListItem.fastDelivery ? (
                    <div> Fast Delivery </div>
                  ) : (
                    <div> 3 days minimum </div>
                  )}
                </Link>
                <div className="desktop-mode padding-one">
                  <button
                    class="danger-btn curved-edge-btn"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_ITEM_FROM_WISHLIST",
                        payload: wishListItem
                      })
                    }
                  >
                    Remove
                  </button>{" "}
                  {wishListItem.quantity > 0 ? (
                    <button
                      className="primary-outline-btn 
                  curved-edge-btn"
                    >
                      Already in Cart
                    </button>
                  ) : (
                    <button
                      className="primary-btn 
                  curved-edge-btn"
                      onClick={() => addToCartFromWishlist(wishListItem)}
                    >
                      Move to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="mobile-mode">
              <div
                style={{ justifyContent: "space-evenly" }}
                className="flex-row padding-one"
              >
                <button
                  class="danger-btn curved-edge-btn"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_ITEM_FROM_WISHLIST",
                      payload: wishListItem
                    })
                  }
                >
                  Remove
                </button>{" "}
                {wishListItem.quantity > 0 ? (
                  <button
                    className="primary-outline-btn 
                  curved-edge-btn"
                  >
                    Already in Cart
                  </button>
                ) : (
                  <button
                    className="primary-btn 
                  curved-edge-btn"
                    onClick={() => addToCartFromWishlist(wishListItem)}
                  >
                    Move to Cart
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
