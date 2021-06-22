import { Dispatch } from 'redux';
import { normalizeError, normalizeUserDataResponse } from '../../../utils/helper';
import { IUser } from '../types';
import { ClearUserDataAction, GetUserFailureAction, GetUserInitAction, GetUserSuccessAction, UserActions,UserActionTypes } from './actionTypes';
import { getUserApi } from './services';

// get user
export const getUserInit = ():GetUserInitAction => ({
  type: UserActionTypes.GET_USER_INIT,
});
export const getUserSuccess = (payload:IUser):GetUserSuccessAction => ({
  type: UserActionTypes.GET_USER_SUCCESS,
  payload: payload,
});
export const getUserFailure = (error:string):GetUserFailureAction => ({
  type: UserActionTypes.GET_USER_FAILURE,
  error: error,
});
export const clearUserData = (): ClearUserDataAction => ({
  type: UserActionTypes.CLEAR_USER_DATA,
});

export const getUser = (payload:string) => async (dispatch:Dispatch<UserActions>): Promise<void> => {
  dispatch(clearUserData());
  dispatch(getUserInit());
  try {
      const response = await getUserApi(payload);
      const { status } = response;
      const data = await response.json();
      if(status >= 200 && status <300){
        dispatch(getUserSuccess(normalizeUserDataResponse(data)));
      }else{
        throw new Error(normalizeError(data, status));
      }
    } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};