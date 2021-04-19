import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../Contexts/dataProvider";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Modal from "../Components/Modal";
import { LoginModal } from "../Components/LoginModal";
import { useAuth } from "../Contexts/authProvider";
export function ProductDescription() {
  const { productId } = useParams();
  const {
    state: { products },
    addToCart,
    open,
    setOpen,
    handleClose,
    addToWishList
  } = useData();
  const { login } = useAuth();
  function getProductDetails(products, productId) {
    return products.find((product) => product.id === productId);
  }

  const product = getProductDetails(products, productId);

  return (
    <div className=" padding3-left-right padding-one">
      <div
        className=" light-border
                  text-center grid gc2-decription"
      >
        <div>
          <img
            style={{ height: "100%", width: "100%" }}
            alt="dress-img"
            src={product?.image}
          />
        </div>
        <div className="padding-one">
          <div className="medium-text bold-text">{product?.name}</div>
          <br />
          <div className="medium-text bold-text">Rs.{product?.price} </div>
          <br />
          {product?.inStock && <div className="green"> In Stock </div>}

          {!product?.inStock && <div className="red"> Out of Stock </div>}
          <br />
          <div className="bold-text">Delivery:</div>
          {product?.fastDelivery ? (
            <div> Fast Delivery </div>
          ) : (
            <div> 3 days minimum </div>
          )}

          <p>{product?.description}</p>
          <div className="flex-row flex-wrap flex-gap">
            {!product?.isWishListed ? (
              <button
                className="secondary-btn 
                      curved-edge-btn"
                onClick={() =>
                  login ? addToWishList(product) : setOpen("login-modal")
                }
              >
                Add to wishlist
              </button>
            ) : (
              <button
                className="secondary-outline-btn curved-edge-btn"
                onClick={() => addToWishList(product)}
              >
                Added to wishlist
              </button>
            )}

            {product?.inStock ? (
              <button
                className="primary-btn curved-edge-btn "
                onClick={() => addToCart(product)}
              >
                <HiOutlineShoppingCart /> Add to Cart
              </button>
            ) : (
              <button className="primary-btn curved-edge-btn disabled ">
                <HiOutlineShoppingCart /> Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
      {open === "login-modal" && (
        <Modal open={open} onclose={handleClose} dismissable>
          <LoginModal />
        </Modal>
      )}
    </div>
  );
}
