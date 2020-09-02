import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './styles/index.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const Home = React.lazy(() => import('./views/home'));

// breaks
// const Page404 = React.lazy(() => import('./views/breaks/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/breaks/page500/Page500'));

const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          {/* <Route exact path="/category/:key" name="Category Page" render={props => <Login {...props} />} />
          <Route exact path="/tag/:key" name="Tag Page" render={props => <Register {...props} />} />
          <Route exact path="/topic/:key" name="Topic Page" render={props => <Confirm {...props} />} />
          <Route exact path="/search" name="Search Page" render={props => <ChangePassword {...props} />} />
          <Route exact path="/detail" name="Detail Page" render={props => <ForgotPassword {...props} />} />
          <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} /> */}
          <Route path="/" name="Home" render={props => <Home {...props} />} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
