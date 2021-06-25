import { Dispatch } from 'redux';
import { normalizeError, normalizeRepositoryListResponse } from '../../../utils/helper';
import { normalizedPageNumber } from '../helper';
import { IRepositoryListData, IRepositoryListPayload } from '../types';
import { 
  FetchRepositoryListActionTypes, 
  RepositoryListActions, 
  FetchRepositoryListFailureAction, 
  FetchRepositoryListInitAction, 
  FetchRepositoryListSuccessAction 
} from './actionTypes';
import { fetchRepositoryListApi } from './services';

// fetch user repositories list
export const fetchRepositoryListInit = (): FetchRepositoryListInitAction => ({
  type: FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_INIT,
});
export const fetchRepositoryListSuccess = 
(payload:IRepositoryListData):FetchRepositoryListSuccessAction => ({
  type: FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_SUCCESS,
  payload: payload,
});
export const fetchRepositoryListFailure = 
(error:string):FetchRepositoryListFailureAction => ({
  type: FetchRepositoryListActionTypes.FETCH_USER_REPOSITORY_FAILURE,
  error: error,
});

export const fetchRepositoryList = 
(payload:IRepositoryListPayload) => async (dispatch:Dispatch<RepositoryListActions>):Promise<void> => {
  dispatch(fetchRepositoryListInit());
  try {
    const response = await fetchRepositoryListApi(payload);
    const { status } = response;
    const data = await response.json();
    const header= response.headers.get('link');

    if(status >= 200 && status < 300) {
      const normalized = normalizeRepositoryListResponse(data,header!);
      //return current page from payload if page is last
      normalized.numPages = normalizedPageNumber(normalized.numPages, payload.pageNumber);
      //incase of empty reposData throw static error
      if(normalized.reposData!.length > 0) {
        dispatch(fetchRepositoryListSuccess(normalized));
      }else{
        throw new Error(normalizeError(data, status));
      }

    }else{
      throw new Error(normalizeError(data, status));
    }
  } catch (error) {
    dispatch(fetchRepositoryListFailure(error.message));
  }
};