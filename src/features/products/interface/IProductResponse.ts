import { IProduct } from './IProduct';

export interface IProductResponse {
  products: IProduct[];
  total: number;
  limit: number;
  skip: number;
}