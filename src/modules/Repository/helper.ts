import { FETCH_USER_REPOSITORY } from "./constants";
import { IRepositoryListPayload } from "./types";

export const normalizeRepositoryListURL = (payload:IRepositoryListPayload):string =>{
  let url = FETCH_USER_REPOSITORY;
      url = url.replace('[username]',encodeURI(payload.userId || ''));
      url = url.replace('[pageNumber]',encodeURI(payload.pageNumber.toString() || '1'));
      return url;
}

export const normalizedPageNumber = (normalizedNumPages: number | undefined, payloadPageNumber: string) => {
  if (normalizedNumPages === 0) {
    return   Number(payloadPageNumber);
  }
  else {
   return normalizedNumPages
  }
}