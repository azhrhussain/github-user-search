import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LazyComponents from "./LazyComponents";
import RouteMap from "./RouteMap";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          {RouteMap.map((item) => {
            const { path, component, ...otherProps } = item;
            const RouteComponent = LazyComponents[component];
            return (
              <Route key={path} path={path} {...otherProps}>
                <React.Suspense fallback={<div>Loading ....</div>}>
                  <RouteComponent />
                </React.Suspense>
              </Route>
            );
          })}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
