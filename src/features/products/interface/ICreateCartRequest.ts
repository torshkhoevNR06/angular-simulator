import { ICartItem } from './ICartItem';

export interface ICreateCartRequest {
  userId: number;
  products: ICartItem[];
}