import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ICart } from '../interface/ICart';
import { CartApiService } from '../api/cart-api.service';
import { tap, Observable } from 'rxjs';
import { ICartResponse } from '../interface/ICartResponse';
import { ICreateCartRequest } from '../interface/ICreateCartRequest';
import { ICartItem } from '../interface/ICartItem';
import { AuthService } from '../../auth/service/auth.service';
import { ICartProduct } from '../interface/ICartProduct';
import { IAuthUser } from '../../auth/interface/IAuthUser';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly cartApiService: CartApiService = inject(CartApiService);
  private readonly authService: AuthService = inject(AuthService);

  readonly cart: WritableSignal<ICart | null> = signal<ICart | null>(null);

  readonly itemsCount: Signal<number> = computed(
    () => this.cart()?.totalQuantity ?? 0
  );

  readonly subtotal: Signal<number> = computed(
    () => {
      if (!this.cart()) {
        return 0;
      }

      return this.cart()!.products.reduce((acc: number, cart: ICartProduct) => {
        return acc += cart.price * cart.quantity;
      }, 0);
    }
  );

  readonly tax: Signal<number> = computed(() => {
    const TAX_RATE = 0.2;
    return this.subtotal() * TAX_RATE;
  });

  readonly total: Signal<number> = computed(() => {
    return this.subtotal() + this.tax();
  });

  loadCart(): void {
    const user: IAuthUser | null = this.authService.getCurrentUser();
      
    if (user) {
      this.getCarts(user.id).subscribe();
    }
  }

  getCarts(userId: number): Observable<ICartResponse> {
    return this.cartApiService.getCarts(userId).pipe(
      tap((cartResponse: ICartResponse) => {
        cartResponse.carts.length !== 0 
          ? this.cart.set(cartResponse.carts[0]) 
          : this.cart.set(null);      
      })
    );
  }

  saveCartItem(cart: ICartItem): Observable<ICart> {
    const authUser: IAuthUser = this.authService.getCurrentUser()!;
    let cart$: Observable<ICart>;

    if (!this.cart()) {
      const newCart: ICreateCartRequest = {
        userId: authUser.id,
        products: [cart]
      };
      
      cart$ = this.cartApiService.createCart(newCart);
    } else {
      cart$ = this.cartApiService.updateCartItems(this.cart()!.id, [cart]);
    }

    return cart$.pipe(
      tap((cartResponse: ICart) => this.cart.set(cartResponse))
    );
  }

}