import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit {

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    console.log('cc');
    this.recipeService.getAll();
  }
}


