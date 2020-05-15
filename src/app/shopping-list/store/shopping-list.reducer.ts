import * as shoppingListActions from './shopping-list.actions';

import { IngredientModel } from '../../shared/ingredient.model';

const initialState = {
  ingredients: [
    new IngredientModel('Яблоки', 5),
    new IngredientModel('Помидоры', 10)
  ]
};

export function shoppingListReducer(
  state = initialState,
  action: shoppingListActions.AddIngredient
) {
  switch (action.type) {
    case shoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    default:
      return state;
  }
}
