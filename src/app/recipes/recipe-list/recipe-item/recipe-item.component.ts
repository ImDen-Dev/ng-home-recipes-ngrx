import { Component, Input } from '@angular/core';
import { RecipeModel } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html'
})
export class RecipeItemComponent {
  @Input() recipeItem: RecipeModel;

  constructor(private recipeService: RecipesService) {}

  onSelectedRecipe() {
    this.recipeService.selectedRecipe.emit(this.recipeItem);
  }
}
