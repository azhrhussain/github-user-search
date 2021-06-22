
import { AnyAction } from "redux";
import produce from "immer";
import {GetUserActionsTypes, UserActionTypes} from './actionTypes';
import { IUserState } from '../types';

const initialState: IUserState = {
  login: '',
  avatar_url:'',
  name: '',
  bio: '',
  isLoading: false,
  error: ""
};

const  userReducer = (state= initialState, action:GetUserActionsTypes ): IUserState => {
  switch (action.type) {
    case UserActionTypes.GET_USER_INIT: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case UserActionTypes.GET_USER_SUCCESS: {

      return produce<IUserState>(state, draft => {
        draft.isLoading = false,
        draft.login = action.payload.login,
        draft.avatar_url = action.payload.avatar_url,
        draft.name = action.payload.name,
        draft.bio = action.payload.bio;
      });
    }
    case UserActionTypes.GET_USER_FAILURE: {
      return produce<IUserState>(state, draft => {
        draft.isLoading = false,
        draft.error = action.error;
      });
    }
    case UserActionTypes.CLEAR_USER_DATA: {
      return produce<IUserState>(state, draft => {
        draft.isLoading = false,
        draft.login= "",
        draft.avatar_url="";
        draft.name= "",
        draft.bio= "",
        draft.error = "";
      });
    }
    default:
      return state;
    }
};
export default userReducer;