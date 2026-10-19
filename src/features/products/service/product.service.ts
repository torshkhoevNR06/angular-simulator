import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { ResourceRef, Signal, WritableSignal } from '@angular/core';
import { ProductApiService } from '../api/product-api.service';
import { IProduct } from '../interface/IProduct';
import { debounceTime, distinctUntilChanged, filter, take, tap, Observable } from 'rxjs';
import { IProductResponse } from '../interface/IProductResponse';
import { Router } from '@angular/router';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { IProductParams } from '../interface/IProductParams';
import { SortBy } from '../enum/SortBy';
import { SortOrder } from '../enum/SortOrder';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productApiService: ProductApiService = inject(ProductApiService);
  
  private router: Router = inject(Router);

  productsResponse: WritableSignal<IProductResponse> = signal({
    products: [],
    skip: 0,
    limit: 30,
    total: 0
  });
  
  product: WritableSignal<IProduct | undefined> = signal(undefined);

  private _limit: WritableSignal<number> = signal(30);
  limit: Signal<number> = computed(() => this._limit());

  private _skip: WritableSignal<number> = signal(0);

  total: Signal<number> = computed(() => this.productsResponse().total);

  search: WritableSignal<string | undefined> = signal('');
  private search$: Observable<string | undefined> = this.createDebounceObservable(this.search);
  private searchSignal: Signal<string | undefined> = toSignal(this.search$, { initialValue: '' });
  
  category: WritableSignal<string | undefined> = signal(undefined);
  private category$: Observable<string | undefined> = this.createDebounceObservable(this.category);
  private categorySignal: Signal<string | undefined> = toSignal(this.category$, { initialValue: undefined });

  sortBy: WritableSignal<SortBy | undefined> = signal(undefined);

  sortOrder: WritableSignal<SortOrder | undefined> = signal(undefined);

  skip: WritableSignal<number> = linkedSignal({
    source: () => {
      return {
        search: this.search(),
        category: this.category(),
        sortBy: this.sortBy(),
        sortOrder: this.sortOrder()
      };
    },
    computation: (newFilters, previous) => {
      if (newFilters !== previous?.source) {
        return 0;
      }

      return this._skip();
    }
  });

  productParams: Signal<IProductParams> = computed(() => {
    const limit: number = this.limit();
    const skip: number = this.skip();
    const search: string | undefined = this.searchSignal();
    const category: string | undefined = this.categorySignal();
    const sortBy: SortBy | undefined = this.sortBy();
    const sortOrder: SortOrder | undefined = this.sortOrder();

    return {
      limit: limit,
      skip: skip,
      search: search,
      category: category,
      sortBy: sortBy,
      sortOrder: sortOrder
    };
  });

  isLoading: Signal<boolean> = computed(
    () => this.filteredProductsResource.isLoading() 
  );

  filteredProductsResource: ResourceRef<IProductResponse | undefined> = rxResource({
    params: () => this.productParams(),
    stream: ({ params }) => {
      return this.productApiService.getProducts(params).pipe(
        tap((productResponse: IProductResponse) => this.productsResponse.set(productResponse))
      );
    }
  });
  
  private filteredProductsResource$: Observable<IProductResponse | undefined> = toObservable(this.filteredProductsResource.value);

  createDebounceObservable(signal: WritableSignal<string | undefined>): Observable<string | undefined> {
    return toObservable(signal).pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
  }
  
  getProducts(): Observable<IProductResponse> {
    return this.productApiService.getProducts().pipe(
      tap((productResponse: IProductResponse) => this.productsResponse.set(productResponse))
    ); 
  }

  getProductsPage(first: number, rows: number): Observable<IProductResponse> {
    this.skip.set(first);
    this._limit.set(rows);

    return this.filteredProductsResource$.pipe(
      filter((response): response is IProductResponse => {
        return response !== undefined && response.skip === first;
      }),
      take(1)
    );
  }
  
  getFilteredProductsPage(query: string): Observable<IProductResponse | undefined> {
    this.search.set(query);
    
    if (query) {
      this.category.set(undefined);
    }
    
    return this.filteredProductsResource$;
  }
  
  getCategories(): Observable<string[]> {
    return this.productApiService.getCategories();
  }
  
  getCurrentProduct(id: string): Observable<IProduct> {
    return this.productApiService.getProductById(id).pipe(
      tap((product: IProduct) => this.product.set(product))
    );
  }

  resetProductParams(): void {
    this._limit.set(this.limit());
    this.skip.set(0);
    this.search.set('');
    this.category.set(undefined);
    this.sortBy.set(undefined);
    this.sortOrder.set(undefined);
  }

  redirectToProductsPage(id: number): void {
    this.router.navigate([`products/${ id }`]);
  }

}