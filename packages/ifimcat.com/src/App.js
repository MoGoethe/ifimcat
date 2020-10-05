import React, { lazy } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './styles/basic.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const Home = lazy(() => import('./views/home'));
const Category = lazy(() => import('./views/category'));
const Tag = lazy(() => import('./views/tag'));
const Topic = lazy(() => import('./views/topic'));
const Search = lazy(() => import('./views/search'));
const Detail = lazy(() => import('./views/detail'));
const Page404 = lazy(() => import('./views/breaks/Page404'));
const Page500 = lazy(() => import('./views/breaks/Page500'));

const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/category/:key" name="Category Page" render={props => <Category {...props} />} />
          <Route exact path="/tag/:key" name="Tag Page" render={props => <Tag {...props} />} />
          <Route exact path="/topic/:key" name="Topic Page" render={props => <Topic {...props} />} />
          <Route exact path="/search" name="Search Page" render={props => <Search {...props} />} />
          <Route exact path="/article/:key" name="Detail Page" render={props => <Detail {...props} />} />
          <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
          <Route path="/" name="Home" render={props => <Home {...props} />} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
