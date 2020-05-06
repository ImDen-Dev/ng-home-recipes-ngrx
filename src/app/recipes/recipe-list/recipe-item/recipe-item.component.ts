import { Component, Input } from '@angular/core';

import { RecipeModel } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html'
})
export class RecipeItemComponent {
  @Input() recipeItem: RecipeModel;
  @Input() id: number;
}
