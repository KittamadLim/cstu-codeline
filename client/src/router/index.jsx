import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import jwtDecode from "jwt-decode";
import axios from "axios";

const token = localStorage.getItem("$IevTd");
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("$IevTd");
    localStorage.removeItem("authenticate");
    delete axios.defaults.headers.common["Authorization"];

    window.location.href = "/";
  } else {
    localStorage.setItem("authenticate", true);
    axios.defaults.headers.common["Authorization"] = token;
  }
}

const Router = () => {
  const authenticate =
    JSON.parse(localStorage.getItem("authenticate")) === true;
  const token = localStorage.getItem("$IevTd");
  if (token) {
    const decodedToken = jwtDecode(token);
    var elder = false,
      freshmen = false;
    if (decodedToken.role === "elder") {
      elder = true;
      freshmen = false;
    } else if (decodedToken.role === "freshmen") {
      freshmen = true;
      elder = false;
    }
  }

  const routing = useRoutes(routes(authenticate, elder, freshmen));
  return (
    <Suspense fallback={null}>
      <Styles />
      <Header />
      {routing}
    </Suspense>
  );
};

export default Router;
