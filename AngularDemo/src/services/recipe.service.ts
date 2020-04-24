import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import * as fromApp from '../store/reducer/app.reducer';
import * as RecipeActions from '../store/actions/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) { }

  getAll() {
    console.log('in getAll()');
    this.http.get<Recipe[]>('../assets/datas/data.json')
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe
          };
        });
      }), catchError(this.handleError),
      )
      .subscribe( recipes => {
          this.store.dispatch(new RecipeActions.LoadRecipe(recipes));
        },
        err => console.log('HTTP Error:', err),
        () => console.log('HTTP request completed.'));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.error instanceof ErrorEvent) {
      errorMessage = `Error: ${errorRes.error.message}`;
    } else {
      errorMessage = `Error Code: ${errorRes.status}\nMessage: ${errorRes.message}`;
    }
    window.alert('An error occurred while retrieving the recipes.');
    return throwError(errorMessage);
  }
}
