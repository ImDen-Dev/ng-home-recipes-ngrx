import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { RecipeModel } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
  recipe: RecipeModel;
  id: number;

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute
  ) {}

  onAddToShoppingList() {
    this.recipeService.onAddIngredients(this.recipe.ingredients);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }
}
