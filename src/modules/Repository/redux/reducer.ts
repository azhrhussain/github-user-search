
import produce from "immer";
import {FetchRepositoryListActionTypes, RepositoryListActions} from './actionTypes';
import { IRepositoryListState } from '../types';

const initialState: IRepositoryListState = {
  isLoading: false,
  numPages: 0,
  reposData: [],
  error: ''
};

const  repositoryReducer = (state= initialState, action:RepositoryListActions): IRepositoryListState => {
  switch (action.type) {
    case FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_INIT: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.error = '';
        draft.reposData =  [];
        draft.numPages =  0;
      });
    }
    case FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_SUCCESS: {
      return produce<IRepositoryListState>(state, draft => {
        draft.reposData =  action.payload.reposData,
        draft.numPages =  action.payload.numPages,
        draft.error = '',
        draft.isLoading = false;
      });
    }
    case FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_FAILURE: {
      return produce<IRepositoryListState>(state, draft => {
        draft.isLoading = false,
        draft.error = action.error;
        draft.reposData =  [],
        draft.numPages =  0;
      });
    }
    default:
      return state;
    }
};
export default repositoryReducer;