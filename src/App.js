import React, { useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { Snackbar } from "./Components/Snackbar";
import { useData } from "./Contexts/dataProvider";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Cart } from "./Pages/Cart";
import { ProductsListing } from "./Pages/ProductListing";
import { WishList } from "./Pages/WishList";
import { ProductDescription } from "./Pages/ProductDescription";
import { NavBar } from "./Components/NavBar";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { PasswordReset } from "./Pages/PasswordReset";
import { PrivateRoute } from "./Components/PrivateRoute";
import { Categories } from "./Pages/Categories";

export default function App() {
  const {
    state: { snackbarText },
    fetchDataToProducts
  } = useData();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get("/api/products");
        localStorage.setItem("data", JSON.stringify(response.data.products));
        const getData = JSON.parse(localStorage?.getItem("data"));
        // dispatch({ type: "FETCH_TO_PRODUCTS", payload: getData });
        fetchDataToProducts(getData);
      } catch (error) {}
    })();
  }, [fetchDataToProducts]);
  return (
    <div className="App">
      <NavBar />

      <div className="margin-top">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products-listing" element={<ProductsListing />} />
          <PrivateRoute path="/wishlist" element={<WishList />} />
          <Route path="/product/:productId" element={<ProductDescription />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
      {snackbarText && <Snackbar />}
    </div>
  );
}
