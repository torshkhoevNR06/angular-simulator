import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../core/service/base-api.service';
import { ICartResponse } from '../interface/ICartResponse';
import { Observable } from 'rxjs';
import { ICreateCartRequest } from '../interface/ICreateCartRequest';
import { ICart } from '../interface/ICart';
import { ICartItem } from '../interface/ICartItem';

@Injectable({
  providedIn: 'root'
})
export class CartApiService extends BaseApiService {
  
  override key: string = 'carts';

  getCarts(userId: number): Observable<ICartResponse> {
    return this.http.get<ICartResponse>(this.getUrl(`/user/${ userId }`));
  }

  createCart(param: ICreateCartRequest): Observable<ICart> {
    return this.http.post<ICart>(this.getUrl(`/add`), param);
  }

  updateCartItems(cartId: number, cartItems: ICartItem[]): Observable<ICart> {
    return this.http.patch<ICart>(this.getUrl(`/${ cartId }`), {
      merge: true,
      products: cartItems
    });
  }

  deleteCart(cartId: number): Observable<ICart> {
    return this.http.delete<ICart & { isDeleted: boolean, deletedOn: string }>(this.getUrl(`/${ cartId }`));
  }

}