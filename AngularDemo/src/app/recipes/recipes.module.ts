import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { ListRecipesComponent } from './list-recipes/list-recipes.component';
import { DetailRecipeComponent } from './detail-recipe/detail-recipe.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    RecipesComponent,
    NewRecipeComponent,
    ListRecipesComponent,
    DetailRecipeComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    RecipesRoutingModule,
    FontAwesomeModule
  ]
})
export class RecipesModule { }
