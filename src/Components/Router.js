import React from "react";
import { Routes, Route } from "react-router-dom";
import { Cart } from "../Pages/Cart";
import { Categories } from "../Pages/Categories";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { PasswordReset } from "../Pages/PasswordReset";
import { ProductDescription } from "../Pages/ProductDescription";
import { ProductsListing } from "../Pages/ProductListing";
import { Register } from "../Pages/Register";
import { WishList } from "../Pages/WishList";
import { PrivateRoute } from "./PrivateRoute";

export function Router() {
  return (
    <>
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
    </>
  );
}
