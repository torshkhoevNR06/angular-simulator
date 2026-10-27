import type { IRecipesState } from '../interface/IRecipesState';

export const initialRecipesState: IRecipesState = {
  recipes: [],
  loading: false,
  error: null
};