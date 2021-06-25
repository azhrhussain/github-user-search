import { IRepositoryListData } from "../types";

export enum FetchRepositoryListActionTypes {
  FETCH_USER_REPOSITORY_INIT = 'FETCH_USER_REPOSITORY_INIT',
  FETCH_USER_REPOSITORY_SUCCESS = 'FETCH_USER_REPOSITORY_SUCCESS',
  FETCH_USER_REPOSITORY_FAILURE = 'FETCH_USER_REPOSITORY_FAILURE',
  DEFAULT = 'DEFAULT',
}
export type FetchRepositoryListInitAction ={
  type: FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_INIT;
}
export type FetchRepositoryListSuccessAction ={
  type: FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_SUCCESS;
  payload: IRepositoryListData,
}
export type FetchRepositoryListFailureAction ={
  type: FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_FAILURE;
  error: string,
}
export type GetUserDefault ={
  type:FetchRepositoryListActionTypes.DEFAULT;
}

export type FetchRepositoryListActionsTypes = 
FetchRepositoryListInitAction |
FetchRepositoryListSuccessAction | 
FetchRepositoryListFailureAction |
GetUserDefault;

export type RepositoryListActions =  FetchRepositoryListActionsTypes;