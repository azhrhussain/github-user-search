import { IUser } from "../types";

export enum UserActionTypes {
 GET_USER_INIT = 'GET_USER_INIT',
 GET_USER_SUCCESS = 'GET_USER_SUCCESS',
 GET_USER_FAILURE = 'GET_USER_FAILURE',
 CLEAR_USER_DATA = 'CLEAR_USER_DATA',
 DEFAULT = 'DEFAULT',
}


export type GetUserInitAction ={
  type: UserActionTypes.GET_USER_INIT,
}
export type ClearUserDataAction ={
  type: UserActionTypes.CLEAR_USER_DATA,
}
export type GetUserSuccessAction ={
  type: UserActionTypes.GET_USER_SUCCESS,
  payload: IUser,
}
export type GetUserFailureAction ={
  type: UserActionTypes.GET_USER_FAILURE,
  error: string,
}
export type GetUserDefault ={
  type:UserActionTypes.DEFAULT,
}

export type GetUserActionsTypes = 
GetUserInitAction |
GetUserSuccessAction | 
GetUserFailureAction |
ClearUserDataAction|
GetUserDefault;

export type UserActions =  GetUserActionsTypes;