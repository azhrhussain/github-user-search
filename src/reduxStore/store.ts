import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./rootReducer";

const middleware = [thunk];
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middleware),
));
export default store;