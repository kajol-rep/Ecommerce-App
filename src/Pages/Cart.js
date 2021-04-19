import React, { useEffect } from "react";
import { useData } from "../Contexts/dataProvider";
import { Link } from "react-router-dom";
import Modal from "../Components/Modal";
import { LoginModal } from "../Components/LoginModal";
import { useAuth } from "../Contexts/authProvider";

export function Cart() {
  const {
    state: { cartItems },
    addToWishList,
    open,
    setOpen,
    handleClose,
    dispatch
  } = useData();
  const { login } = useAuth();
  const TotalItemsInCart = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );
  const TotalPrice = cartItems.reduce(
    (count, item) => count + item.price * item.quantity,
    0
  );
  useEffect(() => {
    cartItems.map((item) => {
      if (item.quantity === 0) {
        return dispatch({
          type: "REMOVE_ITEM_FROM_CART",
          payload: item
        });
      }
      return item;
    });
  }, [cartItems, dispatch]);

  return (
    <div className="padding3-left-right">
      {TotalItemsInCart > 0 ? (
        <>
          <div className="grey-text text-center medium-text padding-one">
            You have {TotalItemsInCart}{" "}
            {TotalItemsInCart > 1 ? <span>items</span> : <span>item</span>} in
            your cart
          </div>

          <div className="grid gc2-d ">
            <ul>
              {cartItems.map((cartItem) => (
                <li
                  style={{ display: cartItem.quantity > 0 ? "block" : "none" }}
                  key={cartItem.id}
                >
                  <div className="light-border">
                    <div
                      className="
                 horizontal-card text-center"
                    >
                      <div
                        style={{ width: "200px", height: "150px" }}
                        className="img-container"
                      >
                        <Link
                          className="link-btn"
                          to={`/product/${cartItem.id}`}
                        >
                          <img
                            style={{ height: "100%", width: "100%" }}
                            alt="cart-item"
                            src={cartItem.image}
                          />
                        </Link>
                      </div>

                      <div className="padding-one ">
                        <Link
                          className="link-btn"
                          to={`/product/${cartItem.id}`}
                        >
                          <strong>{cartItem.name}</strong>
                          <div>Rs.{cartItem.price} </div>
                          {cartItem.inStock && (
                            <div className="green"> In Stock </div>
                          )}
                          {!cartItem.inStock && (
                            <div className="red"> Out of Stock </div>
                          )}

                          {cartItem.fastDelivery ? (
                            <div> Fast Delivery </div>
                          ) : (
                            <div> 3 days minimum </div>
                          )}
                        </Link>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "INCREMENT_QUANTITY",
                              payload: cartItem
                            })
                          }
                        >
                          +
                        </button>
                        <span className="qty-container">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "DECREMENT_QUANTITY",
                              payload: cartItem
                            })
                          }
                        >
                          -
                        </button>
                      </div>
                    </div>

                    <div
                      style={{ justifyContent: "space-evenly" }}
                      className="flex-row padding-one"
                    >
                      <button
                        class="danger-btn curved-edge-btn"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_ITEM_FROM_CART",
                            payload: cartItem
                          })
                        }
                      >
                        Remove
                      </button>

                      {!cartItem.isWishListed ? (
                        <button
                          className="secondary-btn 
                      curved-edge-btn"
                          onClick={() =>
                            login
                              ? addToWishList(cartItem)
                              : setOpen("login-modal")
                          }
                        >
                          Add to wishlist
                        </button>
                      ) : (
                        <button
                          className="secondary-outline-btn curved-edge-btn"
                          onClick={() => addToWishList(cartItem)}
                        >
                          Added to wishlist
                        </button>
                      )}
                    </div>
                  </div>
                  <div style={{ padding: "5px" }}></div>
                </li>
              ))}
            </ul>

            <div className="vertical-card card ch card-shadow light-border padding-one">
              <div className="medium-text bold-text text-center">
                Order Summary
              </div>
              <br />
              <div className="grid gc2">
                <span>Cart Total</span>
                <span className="gend">Rs {TotalPrice}</span>
                <span>Coupon Charges</span>
                <span className="gend red">- Rs 0</span>
                <span>Shipping Charges</span>
                <span className="gend red">- Rs 0</span>
              </div>
              <div className="light-border"></div>
              <div className="grid gc2 bold-text">
                <span>Order Total</span>
                <span className="gend">Rs {TotalPrice}</span>
              </div>
              <button className="primary-btn curved-edge-btn small-text">
                ORDER NOW
              </button>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{ margin: "auto auto", width: "290px" }}
          className=" vertical-card"
        >
          <img
            alt="dog"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41ziSjhxV94vl9Q9izqh0qZeUlA7ynUbEWaXTJrnAzv1PNlnxUsut5cFdcDksbapvPiU&usqp=CAU"
          />
          <div>
            <div className="medium-text">
              You do not have anything in your cart
            </div>
            <br />
            <button className="primary-btn curved-edge-btn">
              <Link className="link-btn" to="/products-listing">
                Go Shopping
              </Link>
            </button>
          </div>
        </div>
      )}
      {open === "login-modal" && (
        <Modal open={open} onclose={handleClose} dismissable>
          <LoginModal />
        </Modal>
      )}
    </div>
  );
}
