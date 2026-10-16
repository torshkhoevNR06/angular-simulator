import { computed, inject, Injectable, signal } from '@angular/core';
import type { ResourceRef, Signal, WritableSignal } from '@angular/core';
import { ProductApiService } from '../api/product-api.service';
import type { IProduct } from '../interface/IProduct';
import { debounceTime, distinctUntilChanged, filter, take, tap, type Observable } from 'rxjs';
import type { IProductResponse } from '../interface/IProductResponse';
import { Router } from '@angular/router';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import type { IProductParams } from '../interface/IProductParams';
import type { SortBy } from '../enum/SortBy';
import type { SortOrder } from '../enum/SortOrder';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly productApiService: ProductApiService = inject(ProductApiService);
  
  private readonly router: Router = inject(Router);

  readonly productsResponse: WritableSignal<IProductResponse> = signal({
    products: [],
    skip: 0,
    limit: 30,
    total: 0
  });
  
  readonly product: WritableSignal<IProduct | undefined> = signal(undefined);

  private readonly _limit: WritableSignal<number> = signal(30);
  readonly limit: Signal<number> = computed(() => this._limit());

  private readonly _skip: WritableSignal<number> = signal(0);
  readonly skip: Signal<number> = computed(() => this._skip());

  readonly total: Signal<number> = computed(() => this.productsResponse().total);

  readonly search: WritableSignal<string | undefined> = signal(undefined);
  private readonly search$: Observable<string | undefined> = this.createDebounceObservable(this.search);
  private readonly searchSignal: Signal<string | undefined> = toSignal(this.search$, { initialValue: undefined });
  
  readonly category: WritableSignal<string | undefined> = signal(undefined);
  private readonly category$: Observable<string | undefined> = this.createDebounceObservable(this.category);
  private readonly categorySignal: Signal<string | undefined> = toSignal(this.category$, { initialValue: undefined });

  readonly sortBy: WritableSignal<SortBy | undefined> = signal(undefined);

  readonly sortOrder: WritableSignal<SortOrder | undefined> = signal(undefined);

  readonly productParams: Signal<IProductParams> = computed(() => {
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

  readonly isLoadingState: Signal<boolean> = computed(
    () => this.filteredProductsResource.isLoading() 
  );

  readonly filteredProductsResource: ResourceRef<IProductResponse | undefined> = rxResource({
    params: () => this.productParams(),
    stream: ({ params }) => {
      return this.productApiService.getProducts(params).pipe(
        tap((productResponse: IProductResponse) => this.productsResponse.set(productResponse))
      );
    }
  });
  
  private readonly filteredProductsResource$: Observable<IProductResponse | undefined> = toObservable(this.filteredProductsResource.value);

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
    this._skip.set(first);
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
    
    this.resetPage();
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

  setCategory(category: string | undefined): void {
    this.category.set(category);

    if (category) {
      this.resetPage();
      this.search.set(undefined);
    }
  }
  
  setSortBy(sortBy: SortBy | undefined): void {
    this.sortBy.set(sortBy);
    this.resetPage();
  }

  setSortOrder(sortOrder: SortOrder | undefined): void {
    this.sortOrder.set(sortOrder);
    this.resetPage();
  }

  resetProductParams(): void {
    this._limit.set(30);
    this._skip.set(0);
    this.search.set(undefined);
    this.category.set(undefined);
    this.sortBy.set(undefined);
    this.sortOrder.set(undefined);
  }

  resetPage(): void {
    this._skip.set(0);
  }

  redirectToProductSearch(id: number): void {
    this.router.navigate([`products/${ id }`]);
  }

}