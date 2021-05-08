import React, { createContext, useContext, useEffect, useState } from "react";
import { fakeAuthApi } from "../api/fakeAuth";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("login"));
    loginStatus?.isUserLoggedIn && setLogin(true);
  });

  async function loginUserWithCredentials(username, password) {
    try {
      const response = await fakeAuthApi(username, password);
      console.log(response);
      if (response.success) {
        setLogin(true);
        navigate("/products-listing");
        localStorage?.setItem(
          "login",
          JSON.stringify({ isUserLoggedIn: true })
        );
      }
    } catch (error) {
      setErrorMessage("Email or Password Incorrect !");
      console.log("wrong password");
    }
  }
  function logoutUser() {
    setLogin(false);
    localStorage?.removeItem("login");
    navigate("/");
  }
  return (
    <AuthContext.Provider
      value={{ login, loginUserWithCredentials, logoutUser, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
