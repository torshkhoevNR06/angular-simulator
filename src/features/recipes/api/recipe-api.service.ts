import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../core/service/base-api.service';
import { IRecipesState } from '../interface/IRecipesState';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService extends BaseApiService {
  
  override key: string = 'recipes';

  getRecipes(): Observable<IRecipesState> {
    return this.http.get<IRecipesState>(this.getUrl(''));
  }

}