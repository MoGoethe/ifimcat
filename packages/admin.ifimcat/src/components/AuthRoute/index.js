import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

function AuthRoute(props) {
  const cookie = getCookie();
  if (cookie) { return (<Route {...props} />) }
  return (<Redirect from="/" to="/login" />)
}

export default AuthRoute;