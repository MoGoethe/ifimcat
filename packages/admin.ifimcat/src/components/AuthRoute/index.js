import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../../conext/Auth.context'

function AuthRoute(props) {
  const ctx = useContext(AuthContext);
  if (ctx.currentUser) { return (<Route {...props} />) }
  return (<Redirect from="/" to="/login" />)
}

export default AuthRoute;