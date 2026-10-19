import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export abstract class BaseApiService {

  readonly apiUrl: string = 'https://dummyjson.com/';
  protected http: HttpClient = inject(HttpClient);
  abstract key: string;

  getUrl(url: string): string {    
    return this.apiUrl + this.key + url;
  }

  getParams(params: [string, string | number | boolean | undefined][]): string {
    return params.map(([name, value]) => this.getParam(name, value!)).filter(Boolean).join('&');
  }

  getParam(name: string, value: string | number | boolean): string {
    return value ? `${ name }=${ value }` : '';
  }

}