import { FETCH_GITHUB_USER } from "../constants";

export const getUserApi = (payload:string):Promise<any> => {
      return fetch(`${FETCH_GITHUB_USER}/${payload}`);
};