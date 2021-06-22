import { FETCH_REPOSITORY_DETAIL, FETCH_REPOSITORY_README } from "../constants";
import { normalizeRepositoryDetailURL } from "../helper";
import { IRepositoryDetail } from "../types";

export const fetchRepositoryDetailApi = (payload:IRepositoryDetail):Promise<Response> => {
      return fetch(normalizeRepositoryDetailURL(payload, FETCH_REPOSITORY_DETAIL))
}
export const fetchRepositoryReadmeApi = (payload:IRepositoryDetail):Promise<Response> => {
      return fetch(normalizeRepositoryDetailURL(payload, FETCH_REPOSITORY_README))
}