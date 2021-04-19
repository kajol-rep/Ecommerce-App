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
              src="https://img2.pngio.com/pets-pet-puppy-kitten-lovepets-dog-dogs-cat-cat-high-kittens-puppies-png-920_406.png"
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
          <li className="light-border" key={wishListItem.id}>
            <div
              className=" 
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
