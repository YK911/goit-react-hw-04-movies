import React, { Suspense, lazy } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "./header/Header";
import Home from "../pages/Home";
import Spinner from "./spinner/Spinner";

const LazyMovies = lazy(() =>
  import("../pages/Movies" /* webpackChunkName: "movies-search" */)
);

const LazyMoviePage = lazy(() =>
  import("../pages/MoviePage" /* webpackChunkName: "movie-page" */)
);

const App = () => (
  <>
    <Header />
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:movie/:id" component={LazyMoviePage} />
        <Route exact path="/movies" component={LazyMovies} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  </>
);

export default App;
