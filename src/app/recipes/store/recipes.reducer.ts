import { RecipeModel } from '../recipe.model';

import * as RecipesActions from './recipes.actions';

export interface State {
  recipes: RecipeModel[];
}

const initialState: State = {
  recipes: []
};

export function recipesReducer(
  state: State = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: { ...action.payload }
      };
    // case RecipesActions.ADD_RECIPE:
    //   return {
    //     ...state,
    //     recipes: { ...action.payload }
    //   };
    default:
      return state;
  }
}
