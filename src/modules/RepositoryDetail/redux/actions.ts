import { Dispatch } from 'redux';
import { normalizeError, normalizeFilePathTree } from '../../../utils/helper';
import { decodeBase64toString } from '../helper';
import { IRepositoryDetail } from '../types';
import { 
  FetchReadmeAction,
  FetchRepoDetailAction,
  FetchRepoDetailFailureAction, 
  FetchRepoDetailInitAction, 
  FetchRepoDetailSuccessAction, 
  ReadmeFailureAction, 
  ReadmeInitAction, 
  ReadmeSuccessAction, 
  RepositoryDetailActionTypes,
  RepositoryReadmeActionTypes, 
} from './actionTypes';
import { fetchRepositoryDetailApi, fetchRepositoryReadmeApi } from './services';

// fetch user repositoryDetail
export const fetchRepositoryDetailInit =
 (): FetchRepoDetailInitAction => ({
  type: RepositoryDetailActionTypes.FETCH_REPOSITORY_DETAIL_INIT,
});
export const fetchRepositoryDetailSuccess = 
(payload:Array<string>):FetchRepoDetailSuccessAction => ({
  type: RepositoryDetailActionTypes.FETCH_REPOSITORY_DETAIL_SUCCESS,
  payload: payload,
});
export const fetchRepositoryDetailFailure = 
(error:string):FetchRepoDetailFailureAction => ({
  type: RepositoryDetailActionTypes.FETCH_REPOSITORY_DETAIL_FAILURE,
  error,
});

export const fetchRepositoryDetail = 
(payload:IRepositoryDetail) => async (dispatch:Dispatch<FetchRepoDetailAction>): Promise<void> => {
  dispatch(fetchRepositoryDetailInit());
  try {
    const response = await fetchRepositoryDetailApi(payload);
    const { status } = response;
    const data = await response.json();
    if(status >= 200 && status < 300){
      dispatch(fetchRepositoryDetailSuccess(normalizeFilePathTree(data)));
    }else{
      throw new Error(normalizeError(data, status));
    }
    } catch (error) {
    dispatch(fetchRepositoryDetailFailure(error.message));
  }

};

//ReadMe action 
export const fetchRepositoryReadmeInit = ():ReadmeInitAction => ({
  type: RepositoryReadmeActionTypes.FETCH_REPOSITORY_README_INIT,
});
export const fetchRepositoryReadmeSuccess = (payload:string):ReadmeSuccessAction => ({
  type: RepositoryReadmeActionTypes.FETCH_REPOSITORY_README_SUCCESS,
  payload: payload,
});
export const fetchRepositoryReadmeFailure = (error:string):ReadmeFailureAction => ({
  type: RepositoryReadmeActionTypes.FETCH_REPOSITORY_README_FAILURE,
  error: error,
});


export const fetchRepositoryReadme = 
(payload:IRepositoryDetail) => async (dispatch:Dispatch<FetchReadmeAction>): Promise<void>  => {
  dispatch(fetchRepositoryReadmeInit());
  try {
    const response = await fetchRepositoryReadmeApi(payload);
    const { status } = response;
    let data = await response.json();
    if(status >= 200 && status < 300){
      //decode from base64 to string
      data = decodeBase64toString(data)
      dispatch(fetchRepositoryReadmeSuccess(data));
    }else{
      throw new Error(normalizeError(data, status));
    }
    } catch (error) {
    dispatch(fetchRepositoryReadmeFailure(error.message));
  }


};