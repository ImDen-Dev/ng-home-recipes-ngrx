import { Action } from '@ngrx/store';
import { RecipeModel } from '../recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: RecipeModel[]) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: RecipeModel) {}
}

export type RecipesActions = SetRecipes | AddRecipe;
