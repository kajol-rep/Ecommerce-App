import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

import { dataReducer } from "./dataReducer";

export const DataContext = createContext();
export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
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
  async function fetchData({ url, dispatchType, listType }) {
    try {
      const { data, status } = await axios.get(url);

      if (status === 200) {
        console.log("inside fetchData", data);
        localStorage.setItem("data", JSON.stringify(data));
        const getData = JSON.parse(localStorage?.getItem("data"));
        console.log(getData);
        dispatch({ type: dispatchType, payload: getData[listType] });
      }
    } catch (error) {
      alert(error);
    }
  }

  function addToCart(productItem) {
    dispatch({ type: "OPEN_SNACKBAR", payload: "Added to cart !" });
    console.log("isaddedtoCart", productItem.isAddedToCart);
    !productItem.isAddedToCart
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

    if (!productItem.isWishListed) {
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
  return (
    <DataContext.Provider
      value={{
        state,
        fetchData,
        addToCart,
        addToWishList,
        addToCartFromWishlist,
        dispatch
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
