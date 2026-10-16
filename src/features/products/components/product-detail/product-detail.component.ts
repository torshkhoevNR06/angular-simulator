import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../service/cart.service';
import type { ICartItem } from '../../interface/ICartItem';
import { MessageService } from '../../../../core/ui/message/service/message.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { LoaderService } from '../../../../core/ui/loader/service/loader.service';
import type { HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-detail',
  imports: [ButtonModule, CardModule, TagModule, RatingModule, CurrencyPipe, DatePipe, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  messageService = inject(MessageService);
  loaderService = inject(LoaderService);
  private readonly translateService = inject(TranslateService);

  private router: ActivatedRoute = inject(ActivatedRoute);
  
  ngOnInit(): void {
    this.productService.product.set(this.router.snapshot.data['product']);
  }

  createCart(): void {
    const cart: ICartItem = {
      id: this.productService.product()!.id,
      quantity: 1
    };

    this.loaderService.showLoader();
    this.cartService.saveCartItem(cart).pipe(
      tap(() => {
        this.loaderService.hideLoader();
        this.messageService.showInfo(this.translateService.instant('productDetail.messages.addedToCart'));
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => {
          this.messageService.showInfo(this.translateService.instant('productDetail.messages.addToCartError', {
            error: err
          }));
        });
      }),
      finalize(() => this.loaderService.hideLoader())
    ).subscribe();
  }

}