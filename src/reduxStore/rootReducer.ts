import { combineReducers } from 'redux';
import repositoryReducer from '../modules/Repository/redux/reducer';
import repositoryDetailReducer from '../modules/RepositoryDetail/redux/reducer';
import userReducer from "../modules/Search/redux/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  repos: repositoryReducer,
  userRepositoryDetail: repositoryDetailReducer,
});
export default rootReducer;
