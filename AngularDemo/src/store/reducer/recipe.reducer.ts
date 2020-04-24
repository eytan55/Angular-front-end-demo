import * as RecipeActions from '../actions/recipe.actions';
import { Recipe } from '../../models/recipe';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function recipesReducer(state = initialState, action: RecipeActions.RecipeActions){
switch (action.type) {
  case RecipeActions.LOAD_RECIPE:
    return {
      ...state,
      recipes: [...state.recipes, ...action.payload]
    };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    default: return state;
}
}
