import { Component, Input } from '@angular/core';
import { RecipeModel } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent {
  @Input() recipe: RecipeModel;

  constructor(private recipeService: RecipesService) {}

  onAddToShoppingList() {
    this.recipeService.onAddIngredients(this.recipe.ingredients);
  }
}
