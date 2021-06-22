import { GITHUB_API_URL } from "../../utils/constants";

export const FETCH_REPOSITORY_DETAIL = `${GITHUB_API_URL}/repos/[username]/[repo]/git/trees/master?recursive=1`;
export const FETCH_REPOSITORY_README = `${GITHUB_API_URL}/repos/[username]/[repo]/contents/README.md`;
