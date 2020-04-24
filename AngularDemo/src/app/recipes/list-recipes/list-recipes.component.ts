import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from '../../../models/recipe';
import * as fromApp from '../../../store/reducer/app.reducer';
import * as RecipeActions from '../../../store/actions/recipe.actions';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.css']
})
export class ListRecipesComponent implements OnInit {

  recipes: Observable<{ recipes: Recipe[] }>;


  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.recipes = this.store.select('recipes');
  }

}
