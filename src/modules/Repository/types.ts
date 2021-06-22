
export interface IRepositoryList{
  id?: number;
  name?: string;
  login?: string;
  description?: string;
}

export interface IRepositoryListData extends IRepositoryList{
  reposData?: Array<IRepositoryList>;
  numPages?: number;
}
export interface IRepositoryListState extends IRepositoryListData {
  error?: string;
  isLoading?: boolean;
}

export interface IRepositoryListPayload{
  userId: string;
  pageNumber: string;
}

export interface IFetchRepositoryPayload{
  userId: string;
  repositoryName: string;
}