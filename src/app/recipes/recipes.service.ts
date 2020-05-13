import { RecipeModel } from './recipe.model';
import { Injectable } from '@angular/core';

import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {
  updatedRecipes = new Subject<RecipeModel[]>();

  // private recipes: RecipeModel[] = [
  //   new RecipeModel(
  //     'Морские гости',
  //     'Креветкам на вечеринке рады всегда. Закуски с их участием — легкие, изысканные и такие вкусные! Лучше всего брать охлажденные креветки. Замороженный продукт следует заранее разморозить при комнатной температуре. Важный момент — аккуратно удалите кишечные нити. Если про них забыть, все впечатление будет испорчено. Давайте приготовим такую быструю закуску на шпажках.',
  //     'https://www.edimdoma.ru/system/images/contents/0000/7745/wide/AdobeStock_107945057_result.jpeg?1571228213',
  //     [
  //       new IngredientModel('креветки', 1),
  //       new IngredientModel('сухое белое вино', 200),
  //       new IngredientModel('чеснок', 4)
  //     ]
  //   ),
  //   new RecipeModel(
  //     'Шашлычок изобилия',
  //     'Смело включайте в меню вечеринки и другие рецепты закусок на шпажках. Продукты для них можно использовать любые. Главное, чтобы они хорошо сочетались между собой и нравились гостям. К тому же угощение на шпажках удобно есть руками. Овощи и мясо — вполне удачное сочетание.',
  //     'https://www.edimdoma.ru/system/images/contents/0000/7746/wide/AdobeStock_277953991_result.jpeg?1571228213',
  //     [
  //       new IngredientModel('мелкий картофель', 18),
  //       new IngredientModel('цукини ', 2),
  //       new IngredientModel('колбаса ', 300)
  //     ]
  //   )
  // ];

  private recipes: RecipeModel[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: RecipeModel[]) {
    this.recipes = recipes;
    console.log(this.recipes);
    this.updatedRecipes.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  onAddIngredients(ingredients: IngredientModel[]) {
    this.slService.addIngredients(ingredients);
  }

  updateRecipe(index: number, newRecipe: RecipeModel) {
    this.recipes[index] = newRecipe;
    this.updatedRecipes.next(this.recipes.slice());
  }

  addRecipe(newRecipe: RecipeModel) {
    this.recipes.push(newRecipe);
    this.updatedRecipes.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.updatedRecipes.next(this.recipes.slice());
  }
}
