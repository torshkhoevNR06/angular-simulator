import { IRecipe } from './IRecipe';

export interface IRecipesState {
  recipes: IRecipe[];
  loading: boolean;
  error: string | null;
}