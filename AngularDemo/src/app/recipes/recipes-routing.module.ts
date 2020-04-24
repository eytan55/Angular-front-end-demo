import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { ListRecipesComponent } from './list-recipes/list-recipes.component';
import { DetailRecipeComponent } from './detail-recipe/detail-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      {
        path: 'new', component: NewRecipeComponent,
      },
      {
        path: 'list', component: ListRecipesComponent,
      },
      {
        path: 'detail/:id', component: DetailRecipeComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule { }
