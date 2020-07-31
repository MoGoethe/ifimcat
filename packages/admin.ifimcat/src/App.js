import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// users
const Login = React.lazy(() => import('./views/users/login/Login'));
const Register = React.lazy(() => import('./views/users/register/Register'));
const Confirm = React.lazy(() => import('./views/users/confirm/Confirm'));
const ChangePassword = React.lazy(() => import('./views/users/changePassword/ChangePassword'));
const ForgotPassword = React.lazy(() => import('./views/users/forgotPassword/ForgotPassword'));

// breaks
const Page404 = React.lazy(() => import('./views/breaks/page404/Page404'));
const Page500 = React.lazy(() => import('./views/breaks/page500/Page500'));

const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
          <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
          <Route exact path="/confirm" name="Confirm User" render={props => <Confirm {...props}/>} />
          <Route exact path="/change-password" name="Change Password" render={props => <ChangePassword {...props}/>} />
          <Route exact path="/forgot-password" name="Forgot Password" render={props => <ForgotPassword {...props}/>} />
          <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
          <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
          <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
