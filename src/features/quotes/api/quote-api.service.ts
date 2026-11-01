import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../core/service/base-api.service';
import { IQuotes } from '../interface/IQuotes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteApiService extends BaseApiService {

  override key: string = 'quotes';

  getQuotes(): Observable<IQuotes> {
    return this.http.get<IQuotes>(this.getUrl(''));
  }

}