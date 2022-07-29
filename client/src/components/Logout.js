import * as React from "react";
import { useNavigate } from "react-router-dom";
import GlobalState from "../context/globalState";

export default function Logout() {
  const navigate = useNavigate();
  const { setToken } = React.useContext(GlobalState);
  localStorage.removeItem("token");
  setToken(null);
  navigate("/");
}
