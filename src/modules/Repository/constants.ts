import { GITHUB_API_URL } from "../../utils/constants";

export const FETCH_USER_REPOSITORY = `${GITHUB_API_URL}/users/[username]/repos?per_page=15&page=[pageNumber]`;