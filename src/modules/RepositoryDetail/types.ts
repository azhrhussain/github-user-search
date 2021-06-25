
export interface IRepositoryDetailPayload {
  filePathTree?: Array<string>;
}
export interface IUserRepositoryDetailState extends IRepositoryDetailPayload {
  error?: string;
  readme?: string | '';
  readmeLoading?: boolean;
  readmeError?: string;
  isLoading?: boolean;
}

export interface IRepositoryDetail{
  username: string;
  repositoryName: string;
}