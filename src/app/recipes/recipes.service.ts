import { RecipeModel } from './recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as RecipesActions from './store/recipes.actions';

import { IngredientModel } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {
  updatedRecipes = new Subject<RecipeModel[]>();
  private recipes: RecipeModel[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  setRecipes(recipes: RecipeModel[]) {
    // this.recipes = recipes;
    // this.updatedRecipes.next(this.recipes.slice());
    this.store.dispatch(new RecipesActions.SetRecipes(recipes));
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  onAddIngredients(ingredients: IngredientModel[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(newRecipe: RecipeModel) {
    this.recipes.push(newRecipe);
    this.updatedRecipes.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: RecipeModel) {
    this.recipes[index] = newRecipe;
    this.updatedRecipes.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.updatedRecipes.next(this.recipes.slice());
  }
}
