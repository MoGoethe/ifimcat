import React, { lazy } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { LoadingBar } from "./components/loading";
import "./styles/basic.scss";

const Home = lazy(() => import('./views/home'));

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<LoadingBar />}>
        <Switch>
          <Route exact path="/" name="Home" render={props => <Home {...props} />} />
          <Route path="/" name="Home" render={props => <Home {...props} />} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
