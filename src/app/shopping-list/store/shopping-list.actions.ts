import { Action } from '@ngrx/store';

import { IngredientModel } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  payload: IngredientModel;
}
