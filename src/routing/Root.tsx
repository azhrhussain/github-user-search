import React, { Suspense, lazy, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LazyComponents from "./LazyComponents";
import RouteMap from "./RouteMap";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {RouteMap.map((item) => {
            const { path, component, ...otherProps } = item;
            const RouteComponent = LazyComponents[component];
            return (
              <Route
                key={path}
                component={RouteComponent}
                path={path}
                {...otherProps}
              />
            );
          })}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
