import type { ICart } from './ICart';

export interface ICartResponse {
  carts: ICart[];
  total: number;
  skip: number;
  limit: number;
}