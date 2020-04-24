import { Action } from '@ngrx/store';
import { Recipe } from '../../models/recipe';

export const LOAD_RECIPE = 'LOAD_RECIPE';
export const ADD_RECIPE = 'ADD_RECIPE';

export class LoadRecipe implements Action {
  readonly type = LOAD_RECIPE;
  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}




export type RecipeActions = LoadRecipe | AddRecipe;
