import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../Contexts/dataProvider";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Modal from "../Components/Modal";
import { LoginModal } from "../Components/LoginModal";
import { useAuth } from "../Contexts/authProvider";
import { calculateDiscount } from "../util";
import Badge from "../Components/Badge";
import { HiStar } from "react-icons/hi";
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
    return products.find((product) => product.id === parseInt(productId, 10));
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
            className="height-full width-full"
            alt="dress-img"
            src={product?.image}
          />
        </div>
        <div className="padding-one">
          <div className="medium-text bold-text">{product?.name}</div>
          <br />
          <div className="medium-text">
            <strong>Rs.{product?.price}</strong>{" "}
            {product?.oldPrice !== product?.price && (
              <span>
                <span className="strike grey-text">Rs.{product?.oldPrice}</span>{" "}
                <span className="red">
                  {calculateDiscount(product?.price, product?.oldPrice)}
                  %OFF
                </span>
              </span>
            )}
          </div>
          <br />
          <div className="flex-row">
            {product?.inStock && <div className="green"> In Stock </div>}
            {!product?.inStock && <div className="red"> Out of Stock </div>}
            <div className="padding-left padding-right">|</div>
            {product?.fastDelivery ? (
              <div> Fast Delivery </div>
            ) : (
              <div> 3 days minimum </div>
            )}
          </div>
          <div className="flex-row">
            <div className="padding-top flex-row">
              <Badge variant="success" shape="square">
                <div className="flex-row">
                  <HiStar size="15px" />
                  {product?.rating}
                </div>
              </Badge>
              <span className="grey-text">({product?.reviews} reviews)</span>
            </div>
          </div>
          <p>{product?.shortDescription}</p>

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
      <div className="padding-one">
        <div className="medium-text">PRODUCT DESCRIPTION</div>
        <p>{product?.description}</p>
      </div>
      {open === "login-modal" && (
        <Modal open={open} onClose={handleClose} dismissable>
          <LoginModal />
        </Modal>
      )}
    </div>
  );
}
