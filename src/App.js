import React, { useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { Snackbar } from "./Components/Snackbar";
import { useData } from "./Contexts/dataProvider";
import { NavBar } from "./Components/NavBar";
import { url } from "./util";
import { Router } from "./Components/Router";

export default function App() {
  const {
    state: { snackbarText },
    dispatch
  } = useData();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(url);
        localStorage.setItem("data", JSON.stringify(response.data.products));
        const data = JSON.parse(localStorage?.getItem("data"));
        if (response.status === 200) {
          dispatch({ type: "FETCH_PRODUCTS", payload: data });
        }
      } catch (error) {}
    })();
  }, [dispatch]);
  return (
    <div className="App">
      <NavBar />

      <div className="margin-top">
        <Router />
      </div>
      {snackbarText && <Snackbar />}
    </div>
  );
}
