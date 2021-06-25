import { normalizeRepositoryListURL } from "../helper";
import { IRepositoryListPayload } from "../types";

export const fetchRepositoryListApi = (payload:IRepositoryListPayload):Promise<Response> => {
      const url =normalizeRepositoryListURL(payload);
     return fetch(url);
};