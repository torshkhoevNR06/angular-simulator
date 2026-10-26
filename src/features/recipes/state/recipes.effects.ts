import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, type CreateEffectMetadata } from '@ngrx/effects';
import { RecipeApiService } from '../api/recipe-api.service';
import { recipeActions } from './recipes.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import type { IRecipesState } from '../interface/IRecipesState';

@Injectable({
  providedIn: 'root'
})
export class RecipesEffectsService {

  private actions$: Actions = inject(Actions);
  private recipesApiService: RecipeApiService = inject(RecipeApiService);

  private loadRecipes$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
    ofType(recipeActions.loadRecipes),
    switchMap(() => this.recipesApiService.getRecipes()),
    map((recipesState: IRecipesState) => recipeActions.loadRecipesSuccess({ recipes: recipesState.recipes })),
    catchError(() => of(recipeActions.loadRecipesFailure({ error: 'Ошибка при загрузке рецептов' })))
  ));

}