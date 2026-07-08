import { IPost } from './IPost';

export interface IPostResponse extends IPost {
  posts: IPost[];
  total: number;
  limit: number;
  skip: number;
}