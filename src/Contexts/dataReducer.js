export const dataReducer = (state, { type, payload }) => {
  switch (type) {
    case "FETCH_PRODUCTS":
      return { ...state, products: payload };
    case "FETCH_TO_WISHLIST":
      return { ...state, wishListItems: payload };
    case "SORT":
      return { ...state, sortBy: payload };
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
      return { ...state, searchItem: payload };
    case "TOGGLE_DELIVERY":
      return (state = {
        ...state,
        showFastDeliveryOnly: !state.showFastDeliveryOnly
      });
    case "ADD_ITEM_TO_WISHLIST":
      return {
        ...state,

        wishListItems: state.wishListItems.concat(payload)
      };
    case "REMOVE_ITEM_FROM_WISHLIST":
      return {
        ...state,
        wishListItems: state.wishListItems.filter(
          (item) => item.id !== payload.id
        )
      };
    case "ADD_ITEM_TO_CART":
      return {
        ...state,

        cartItems: state.cartItems.concat(payload)
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      };
    case "REMOVE_ITEM_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== payload.id)
      };
    case "OPEN_SNACKBAR":
      return {
        ...state,
        snackbarText: payload,
        isSnackbarActive: payload
      };
    case "CLOSE_SNACKBAR":
      return {
        ...state,
        snackbarText: payload,
        isSnackbarActive: payload
      };

    case "SEARCH_ITEM":
      const searchResult = getSearchedItems(payload, state.products);
      state.searchedItems = [];

      return {
        ...state,
        searchedItems: state.searchedItems.concat(searchResult),
        itemToSearch: payload
      };
    case "SET_SELECTED_PET":
      return {
        ...state,
        petsType: payload
      };
    default:
      return state;
  }
};

function getSearchedItems(itemToSearch, products) {
  const productlist = products.filter(
    (item) =>
      (itemToSearch !== null &&
        item.name.toLowerCase().includes(itemToSearch.toLowerCase())) ||
      item.description.toLowerCase().includes(itemToSearch.toLowerCase())
  );
  return productlist;
}
