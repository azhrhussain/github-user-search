import {IRepositoryDetailPayload, IUserRepositoryDetailState} from '../types';

export const enum RepositoryDetailActionTypes {
 FETCH_REPOSITORY_DETAIL_INIT = 'FETCH_REPOSITORY_DETAIL_INIT',
 FETCH_REPOSITORY_DETAIL_SUCCESS = 'FETCH_REPOSITORY_DETAIL_SUCCESS',
 FETCH_REPOSITORY_DETAIL_FAILURE = 'FETCH_REPOSITORY_DETAIL_FAILURE',
}
export const enum RepositoryReadmeActionTypes {
 FETCH_REPOSITORY_README_INIT = 'FETCH_REPOSITORY_README_INIT',
 FETCH_REPOSITORY_README_SUCCESS = 'FETCH_REPOSITORY_README_SUCCESS',
 FETCH_REPOSITORY_README_FAILURE = 'FETCH_REPOSITORY_README_FAILURE',
}


export type FetchRepoDetailInitAction ={
  type: RepositoryDetailActionTypes.FETCH_REPOSITORY_DETAIL_INIT,
}

export type FetchRepoDetailSuccessAction ={
  type: RepositoryDetailActionTypes.FETCH_REPOSITORY_DETAIL_SUCCESS,
  payload: Array<string>,
}
export type FetchRepoDetailFailureAction ={
  type: RepositoryDetailActionTypes.FETCH_REPOSITORY_DETAIL_FAILURE,
  error:string,
}

export type ReadmeInitAction ={
  type: RepositoryReadmeActionTypes.FETCH_REPOSITORY_README_INIT,
}

export type ReadmeSuccessAction ={
  type: RepositoryReadmeActionTypes.FETCH_REPOSITORY_README_SUCCESS,
  payload: string,
}
export type ReadmeFailureAction ={
  type: RepositoryReadmeActionTypes.FETCH_REPOSITORY_README_FAILURE,
  error:string,
}

export type FetchRepoDetailAction = 
FetchRepoDetailInitAction | 
FetchRepoDetailSuccessAction |
FetchRepoDetailFailureAction;

export type FetchReadmeAction = 
ReadmeInitAction | 
ReadmeSuccessAction |
ReadmeFailureAction;

export type RepositoryDetailActions = FetchRepoDetailAction | FetchReadmeAction;