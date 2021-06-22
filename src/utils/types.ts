
import {IUserState} from '../modules/Search/types';
import { IRepositoryListState } from '../modules/Repository/types';
import { IUserRepositoryDetailState } from '../modules/RepositoryDetail/types';
export interface IRootState  {
  user: IUserState,
  repos: IRepositoryListState,
  userRepositoryDetail: IUserRepositoryDetailState,
}

export interface ActionType {
	type: any,
  payload?: any,
}

export interface IErrorCard{
  errorText?: string;
  size?: string;
}

export interface ILoader{
  loaderText?: string;
}

export interface IPagination{
  page: number;
  numPages: number;
  handleClickPrevious: () => void;
  handleClickNext: () => void;
}