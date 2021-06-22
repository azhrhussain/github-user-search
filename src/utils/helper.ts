import { IRepositoryListData } from '../modules/Repository/types';
import { IUser } from './../modules/Search/types';
import { ERROR_UNAVAILABLE, ERROR_WITH_STATUS } from './constants';
//Error with helper text for unhandled errors
export const normalizeError = (data: any, status: number): string =>{
  if (data.message) {
    return data.message;
  }
  else if(status === 200 && !data.message ){
    return ERROR_UNAVAILABLE;
  }
  else if(status) {
    return ERROR_WITH_STATUS.replace(':status',status.toString());
  }
  return ERROR_UNAVAILABLE;
};

// normalizeUserDataResponse with User Interface
export const normalizeUserDataResponse = (data: any):IUser =>{
  const user = data;
  return {
    login: user.login || "",
    avatar_url: user.avatar_url || "",
    name: user.name || "",
    bio: user.bio || "",
  };
};
// normalizeRepositoryListResponse Response = 200 IRepositoryListData Interface
export const normalizeRepositoryListResponse = (data: any, header:string):IRepositoryListData =>{
  const repositoryList = data.filter(repo => !repo.private).map(repo => {
    return {
      id: repo.id,
      name: repo.name,
      login: repo.owner.login,
      description: repo.description,
    };
  });
  let numPageStr = '';
  if (!header) {
    numPageStr = '0';
  }
  else {
    const matchFound = header.match(/page=(\d+)>; rel="last"/);
    if (matchFound) {
      numPageStr = matchFound[1];
    }else{
      numPageStr = '0';
    }
  }
  return ({reposData: repositoryList, numPages: Number(numPageStr)});
};

// normalizeFilePathTree and convert to array of string
export const normalizeFilePathTree = (data: any): Array<string> =>{
  const { tree =[] } = data;
  const pathTree = tree.map(t=> t.path);
  return pathTree;
};
