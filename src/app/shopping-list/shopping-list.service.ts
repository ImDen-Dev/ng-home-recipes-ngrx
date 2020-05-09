import { IngredientModel } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<IngredientModel[]>();
  startingEditing = new Subject<number>();

  private ingredients: IngredientModel[] = [
    new IngredientModel('Яблоки', 5),
    new IngredientModel('Помидоры', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: IngredientModel) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients = this.ingredients.filter((ing, i) => index !== i);
    this.ingredientsChanged.next(this.ingredients.slice());
    console.log(this.ingredients);
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: IngredientModel[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
