export interface IUser {
  login?: string;
  avatar_url?: string;
  name?: string;
  bio?: string;
}
export interface IUserState extends IUser{
  error?: string;
  isLoading?: boolean;
}