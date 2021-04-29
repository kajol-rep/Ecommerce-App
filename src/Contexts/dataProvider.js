import React, { createContext, useContext, useReducer, useState } from "react";
import { checkIfProductExistsInList } from "../util";
import { dataReducer } from "./dataReducer";

export const DataContext = createContext();
export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [open, setOpen] = useState();
  const [state, dispatch] = useReducer(dataReducer, {
    products: [],
    wishListItems: [],
    cartItems: [],
    searchedItems: [],
    sortBy: null,
    showInventoryAll: true,
    showFastDeliveryOnly: false,
    snackbarText: null,
    showLoginModal: false,
    petsType: null
  });

  function addToCart(productItem) {
    dispatch({ type: "OPEN_SNACKBAR", payload: "Added to cart !" });
    console.log("isaddedtoCart", productItem.isAddedToCart);
    !checkIfProductExistsInList(state.cartItems, productItem.id)
      ? dispatch({
          type: "ADD_ITEM_TO_CART",
          payload: { ...productItem, quantity: 1 }
        })
      : dispatch({
          type: "INCREMENT_QUANTITY",
          payload: productItem
        });
    console.log("isaddedtoCart", productItem.isAddedToCart);
  }
  function addToWishList(productItem) {
    console.log("inside handlewish", productItem.name);

    if (!checkIfProductExistsInList(state.wishListItems, productItem.id)) {
      dispatch({ type: "OPEN_SNACKBAR", payload: "Added to wishlist !" });
      dispatch({
        type: "ADD_ITEM_TO_WISHLIST",
        payload: productItem
      });
    } else {
      dispatch({ type: "OPEN_SNACKBAR", payload: "Removed from wishlist !" });
      dispatch({
        type: "REMOVE_ITEM_FROM_WISHLIST",
        payload: productItem
      });
    }
    console.log("is wishlisted", productItem.isWishListed);
    console.log("is addedtoCart", productItem.isAddedToCart);
  }
  function addToCartFromWishlist(wishListItem) {
    console.log("wishlst added to cart", wishListItem.isAddedToCart);
    dispatch({ type: "OPEN_SNACKBAR", payload: "Moved to cart !" });
    dispatch({
      type: "REMOVE_ITEM_FROM_WISHLIST",
      payload: wishListItem
    });
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: { ...wishListItem, quantity: 1 }
    });

    console.log("after wishlst added to cart", wishListItem.isAddedToCart);
  }
  function handleClose() {
    setOpen(null);
  }
  return (
    <DataContext.Provider
      value={{
        state,
        addToCart,
        addToWishList,
        addToCartFromWishlist,
        dispatch,
        open,
        setOpen,
        handleClose
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
