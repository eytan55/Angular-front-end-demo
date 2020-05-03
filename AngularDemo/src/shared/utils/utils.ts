import { Recipe } from 'src/models/recipe';

export class Utils {
  static countElementsInArray(recipes: Recipe[]) {
    return recipes.length;
   }
}
