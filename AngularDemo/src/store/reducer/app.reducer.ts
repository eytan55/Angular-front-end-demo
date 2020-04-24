import { ActionReducerMap } from '@ngrx/store';
import * as fromRecipe from '../reducer/recipe.reducer';

export interface AppState {
  recipes: fromRecipe.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  recipes: fromRecipe.recipesReducer
};
