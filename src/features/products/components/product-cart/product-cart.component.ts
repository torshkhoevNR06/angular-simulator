import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CartService } from '../../service/cart.service';
import { CurrencyPipe } from '@angular/common';
import { MessageService } from '../../../../core/ui/message/service/message.service';
import { catchError, tap, throwError } from 'rxjs';
import { LoaderService } from '../../../../core/ui/loader/service/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CardModule, RouterLink, CurrencyPipe, TranslatePipe],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss'
})
export class CartComponent implements OnInit {

  private translateService: TranslateService = inject(TranslateService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);
  cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.loadCart();
  }

  private updateProductQuantity(id: number, messageInfo: string, messageError: string, currentQuantity?: number): void {
    this.loaderService.showLoader();
    this.cartService.saveCartItem({ id, quantity: currentQuantity ?? 0 })
      .pipe(
        tap(() => {
          this.loaderService.hideLoader();
          this.messageService.showInfo(this.translateService.instant(messageInfo));
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => {
            this.loaderService.hideLoader();
            this.messageService.showError(this.translateService.instant(messageError, { error: err }));
          });
        })
      ).subscribe();
  }
  
  increaseQuantity(id: number, currentQuantity: number): void {
    this.updateProductQuantity(id, 'cartPage.messages.increased', 'cartPage.messages.increaseError', currentQuantity + 1);
  }

  decreaseQuantity(id: number, currentQuantity: number): void {
    this.updateProductQuantity(id, 'cartPage.messages.decreased', 'cartPage.messages.decreaseError', currentQuantity - 1);
  }

  removeProduct(id: number): void {
    this.updateProductQuantity(id, 'cartPage.messages.removed', 'cartPage.messages.removeError');
  }

  checkout(): void {
    if (this.cartService.cart()) {
      this.messageService.showInfo(this.translateService.instant('cartPage.messages.orderPlaced'));
      return this.clearCart();
    }
  }

  clearCart(): void {
    return this.cartService.cart.set(null);
  }

}