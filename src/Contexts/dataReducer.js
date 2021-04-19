export const dataReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TO_PRODUCTS":
      const updatedWishListedItems = getUpdatedProductListIfWishListed(
        state.wishListItems,
        action.payload
      );
      const updatedProducts = getUpdatedProductListIfAddedToCart(
        state.cartItems,
        updatedWishListedItems
      );
      return { ...state, products: updatedProducts };
    case "FETCH_TO_WISHLIST":
      return { ...state, wishListItems: action.payload };
    case "SORT":
      return { ...state, sortBy: action.payload };
    case "TOGGLE_INVENTORY":
      return (state = {
        ...state,
        showInventoryAll: !state.showInventoryAll
      });
    case "TOGGLE_SIDEBAR":
      return (state = {
        ...state,
        showSidebar: !state.showSidebar
      });
    case "SEARCH":
      return { ...state, searchItem: action.payload };
    case "TOGGLE_DELIVERY":
      return (state = {
        ...state,
        showFastDeliveryOnly: !state.showFastDeliveryOnly
      });
    case "ADD_ITEM_TO_WISHLIST":
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload.id ? { ...item, isWishListed: true } : item
        ),
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? { ...item, isWishListed: true } : item
        ),
        wishListItems: state.wishListItems.concat(action.payload)
      };
    case "REMOVE_ITEM_FROM_WISHLIST":
      return {
        ...state,
        wishListItems: state.wishListItems.filter(
          (item) => item.id !== action.payload.id
        ),
        products: state.products.map((item) =>
          item.id === action.payload.id
            ? { ...item, isWishListed: false }
            : item
        ),
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, isWishListed: false }
            : item
        )
      };
    case "ADD_ITEM_TO_CART":
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload.id
            ? { ...item, isAddedToCart: true }
            : item
        ),
        wishListItems: state.wishListItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, isAddedToCart: true }
            : item
        ),
        cartItems: state.cartItems.concat(action.payload)
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        wishListItems: state.wishListItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        wishListItems: state.wishListItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      };
    case "REMOVE_ITEM_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
        products: state.products.map((item) =>
          item.id === action.payload.id
            ? { ...item, isAddedToCart: false, quantity: 0 }
            : item
        ),
        wishListItems: state.wishListItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, isAddedToCart: false, quantity: 0 }
            : item
        )
      };
    case "OPEN_SNACKBAR":
      return {
        ...state,
        snackbarText: action.payload,
        isSnackbarActive: action.payload
      };
    case "CLOSE_SNACKBAR":
      return {
        ...state,
        snackbarText: action.payload,
        isSnackbarActive: action.payload
      };

    case "SEARCH_ITEM":
      const searchResult = getSearchedItems(action.payload, state.products);
      state.searchedItems = [];

      return {
        ...state,
        searchedItems: state.searchedItems.concat(searchResult),
        itemToSearch: action.payload
      };
    case "SET_SELECTED_PET":
      return {
        ...state,
        petsType: action.payload
      };
    default:
      return state;
  }
};
function checkIfItemExistsInList(list, productItem) {
  return list.find((item) => item.id === productItem.id) !== undefined;
}
function getUpdatedProductListIfWishListed(wishList, products) {
  return products.map((productItem) => {
    if (checkIfItemExistsInList(wishList, productItem)) {
      return { ...productItem, isWishListed: true };
    }
    return { ...productItem, isWishListed: false };
  });
}
function getUpdatedProductListIfAddedToCart(cartList, products) {
  return products.map((productItem) => {
    if (checkIfItemExistsInList(cartList, productItem)) {
      return { ...productItem, isAddedToCart: true };
    }
    return { ...productItem, isAddedToCart: false };
  });
}

function getSearchedItems(itemToSearch, products) {
  const productlist = products.filter(
    (item) =>
      (itemToSearch !== null &&
        item.name.toLowerCase().includes(itemToSearch.toLowerCase())) ||
      item.description.toLowerCase().includes(itemToSearch.toLowerCase())
  );
  return productlist;
}
