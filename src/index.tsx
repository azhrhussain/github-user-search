import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { BaseCSS } from "styled-bootstrap-grid";
import store from "./reduxStore/store";
import App from "./routing/Root";

ReactDom.render(
  <Provider store={store}>
    <BaseCSS />
    <App />
  </Provider>,
  document.querySelector("#app-root")
);
