import { Component, OnInit } from '@angular/core';
import { RecipeModel } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  providers: [RecipesService]
})
export class RecipesComponent implements OnInit {
  recipeDetail: RecipeModel;

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.recipeService.selectedRecipe.subscribe((recipe: RecipeModel) => {
      this.recipeDetail = recipe;
    });
  }
}
