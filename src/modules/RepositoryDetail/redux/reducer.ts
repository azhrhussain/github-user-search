
import produce from "immer";
import  { RepositoryDetailActions, RepositoryDetailActionTypes, RepositoryReadmeActionTypes } from './actionTypes';
import { IUserRepositoryDetailState } from '../types';

const initialState: IUserRepositoryDetailState = {
  isLoading: false,
  filePathTree: [],
  error: '',
  readme: '',
  readmeLoading: false,
  readmeError: '',
};

const  repositoryDetailReducer = (state= initialState, action:RepositoryDetailActions): IUserRepositoryDetailState => {
  switch (action.type) {
    case RepositoryDetailActionTypes.FETCH_REPOSITORY_DETAIL_INIT: {
      return produce<IUserRepositoryDetailState>(state, draft => {
        draft.isLoading = true;
        draft.error ='';
      });
    }
    case RepositoryDetailActionTypes.FETCH_REPOSITORY_DETAIL_SUCCESS: {
      return produce<IUserRepositoryDetailState>(state, draft => {
        draft.isLoading = false,
        draft.error = '',
        draft.filePathTree = action.payload;
      });
    }
    case RepositoryDetailActionTypes.FETCH_REPOSITORY_DETAIL_FAILURE: {
      return produce<IUserRepositoryDetailState>(state, draft => {
        draft.isLoading = false,
        draft.filePathTree = [],
        draft.error = action.error;
      });
    }
    case RepositoryReadmeActionTypes.FETCH_REPOSITORY_README_INIT: {
      return produce<IUserRepositoryDetailState>(state, draft => {
        draft.readmeLoading = true;
      });
    }
    case RepositoryReadmeActionTypes.FETCH_REPOSITORY_README_SUCCESS: {
      return produce<IUserRepositoryDetailState>(state, draft => {
        draft.readmeLoading = false,
        draft.readmeError = '',
        draft.readme = action.payload;
      });
    }
    case RepositoryReadmeActionTypes.FETCH_REPOSITORY_README_FAILURE: {
      return produce<IUserRepositoryDetailState>(state, draft => {
        draft.readmeLoading = false,
        draft.readme = '',
        draft.readmeError = action.error;
      });
    }
    default:
      return state;
    }
};
export default repositoryDetailReducer;