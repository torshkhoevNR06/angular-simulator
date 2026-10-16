import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { ProductApiService } from '../api/product-api.service';
import { IProduct } from '../interface/IProduct';

export const productResolver: ResolveFn<IProduct> = (route: ActivatedRouteSnapshot) => {
  const productId: string | null = route.paramMap.get('id');
  const productApiService: ProductApiService = inject(ProductApiService);
  
  return productApiService.getProductById(productId);
};