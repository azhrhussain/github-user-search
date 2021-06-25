import { IRepositoryDetail } from "./types";

export const normalizeRepositoryDetailURL = (payload:IRepositoryDetail, urlString:string):string =>{
  let url =  urlString;
  url = url.replace('[username]', payload.username || '');
  url = url.replace('[repo]', payload.repositoryName || '');
  return url;
}

//decode from base64 to string
export const decodeBase64toString = (data: any): string => {
  let decodeBase64toString = '';
  if(data?.content){
    decodeBase64toString = atob(data.content);
  }
  return decodeBase64toString
}
