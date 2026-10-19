import { Component, inject, OnInit, effect, ResourceRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule, type TablePageEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from '../../core/ui/message/service/message.service';
import { MessageService as MessageServicePrimeNG } from 'primeng/api';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from './service/product.service';
import { tap } from 'rxjs';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { UpperCasePipe } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { IProductResponse } from './interface/IProductResponse';
import { SortBy } from './enum/SortBy';
import { SelectModule } from 'primeng/select';
import { ISortField } from './interface/ISortField';
import { SortOrder } from './enum/SortOrder';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IAutoCompleteEvent } from './interface/IAutoCompleteEvent';
import { CartService } from './service/cart.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [UpperCasePipe, SkeletonModule, InputIconModule, ToggleSwitchModule, IconFieldModule, PaginatorModule, ButtonModule, RatingModule, FloatLabelModule, InputTextModule, TableModule, TagModule, ToastModule, RippleModule, FormsModule, CurrencyPipe, SelectModule, AutoCompleteModule, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [MessageServicePrimeNG]
})
export class ProductsComponent implements OnInit {
  
  readonly productService: ProductService = inject(ProductService);
  private readonly messageService: MessageService = inject(MessageService);
  private readonly cartService: CartService = inject(CartService);
  private readonly translateService: TranslateService = inject(TranslateService);

  readonly zeros: number[] = new Array(30).fill(0);
  
  readonly sortByCategories: ISortField[] = Object.values(SortBy).map(
    (key: SortBy) => ({ 
      name: `productsPage.sort.${ key }`, sortBy: key 
    })
  );

  readonly sortByOrders: ISortField[] = Object.values(SortOrder).map(
    (key: SortOrder) => ({
      name: `productsPage.sortOrder.${ key }`, sortOrder: key
    })
  );

  protected categories: string[] = [];
  protected sortByOptions: string[] = [];

  ngOnInit(): void {
    this.cartService.loadCart();

    this.productService.getCategories()
      .pipe(
        tap((categories: string[]) => {
          this.messageService.showInfo(this.translateService.instant('productsPage.messages.loaded'));
          this.categories = [...categories];
        })
      ).subscribe();
  }

  isDisabledResetButton(): boolean {
    if (this.productService.search() 
      || this.productService.category() 
      || this.productService.sortBy() 
      || this.productService.sortOrder()) {
      return false;
    }
    
    return true;
  }

  constructor() {
    effect(() => {
      const filteredProductsResource: ResourceRef<IProductResponse | undefined> = this.productService.filteredProductsResource;

      if (filteredProductsResource.status() === 'error') {
        this.messageService.showError(this.translateService.instant('productsPage.messages.filterError', {
          error: filteredProductsResource.error()
        }));
      }
    });
  }

  filterCategories(event: IAutoCompleteEvent): string[] {
    const filteredCategories: string[] = this.categories.filter((category: string) => {
      return category.trim().toLocaleLowerCase().includes(
        event.query.trim().toLocaleLowerCase()
      );
    });

    if (event.query === '') {
      return this.sortByOptions = [...this.categories];
    }

    return this.sortByOptions = [...filteredCategories];
  }

  onPageChange(event: TablePageEvent): void {
    this.productService.getProductsPage(event.first!, event.rows!)
      .pipe(
        tap(() => this.messageService.showInfo(this.translateService.instant('productsPage.messages.pageChanged')))
      ).subscribe();
  }

  onSearchInput(query: string): void {
    this.productService.getFilteredProductsPage(query).subscribe();
  }

}