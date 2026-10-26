import { createActionGroup, props } from '@ngrx/store';
import { IRecipe } from '../interface/IRecipe';

export const recipeActions = createActionGroup({
  source: 'Recipes',
  events: {
    'Load Recipes': props<{ loading: boolean }>(),
    'Load Recipes Success': props<{ recipes: IRecipe[] }>(),
    'Load Recipes Failure': props<{ error: string | null }>()
  }
});