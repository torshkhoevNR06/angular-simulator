import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductResponse } from '../interface/IProductResponse';
import { IProduct } from '../interface/IProduct';
import { IProductParams } from '../interface/IProductParams';
import { BaseApiService } from '../../../core/service/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService extends BaseApiService {
  
  override key: string = 'products';
  
  getProducts(params?: IProductParams | undefined): Observable<IProductResponse> {
    const urlCategory: string = params!.category ? '/category' : '';
    const urlSearch: string = params?.search ? '/search' : '';

    const queryProductParams: string = this.getParams([
      ['limit', params?.limit],
      ['skip', params?.skip],
      ['sortBy', params?.sortBy],
      ['order', params?.sortOrder]
    ]);

    if (params?.category && params?.category !== null) {      
      return this.http.get<IProductResponse>(this.getUrl(`${ urlCategory }/${ params.category }?` + queryProductParams));
    } else if (params?.search) {
      return this.http.get<IProductResponse>(this.getUrl(`${ urlSearch }?q=${ params.search }&` + queryProductParams));
    } else {
      return this.http.get<IProductResponse>(this.getUrl(`?${ queryProductParams }`));
    }
  }
  
  getProductById(id: string | null): Observable<IProduct> {
    return this.http.get<IProduct>(this.getUrl(`/${ id }`));
  }
  
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.getUrl('/category-list'));
  }

}