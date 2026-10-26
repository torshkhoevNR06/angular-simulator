import { createReducer, on, Action,ActionReducer } from '@ngrx/store';
import { initialRecipesState } from './recipes.state';
import { recipeActions } from './recipes.actions';
import { IRecipesState } from '../interface/IRecipesState';

export const recipesReducer: ActionReducer<IRecipesState, Action<string>> = createReducer(
  initialRecipesState,
  on(recipeActions.loadRecipes, (state: IRecipesState) => ({
    ...state,
    loading: true
  })),
  on(recipeActions.loadRecipesSuccess, (state: IRecipesState, { recipes }) => ({
    ...state,
    recipes: recipes,
    loading: false
  })),
  on(recipeActions.loadRecipesFailure, (state: IRecipesState, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);