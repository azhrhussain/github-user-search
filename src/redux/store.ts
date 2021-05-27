import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
// import settingsReducer from "../modules/Settings/reducer";
// import entryReducer from "../modules/Entries/reducer";
// import notificationReducer from "../modules/Notification/reducer";
// import importFileReducer from "../modules/ImportCSV/reducer";
// import googleSheetReducer from "../modules/ImportGoogleSheet/reducer";
// import bulkUploadReducer from "../modules/BulkUpload/reducer";
const rootReducer = combineReducers({
  // settings: settingsReducer,
  // entries: entryReducer,
  // notification: notificationReducer,
  // importFile: importFileReducer,
  // googleSheet: googleSheetReducer,
  // bulkUpload: bulkUploadReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;