import { RecipeModel } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipesService {
  selectedRecipe = new EventEmitter<RecipeModel>();

  private recipes: RecipeModel[] = [
    new RecipeModel(
      'Морские гости',
      'Креветкам на вечеринке рады всегда. Закуски с их участием — легкие, изысканные и такие вкусные! Лучше всего брать охлажденные креветки. Замороженный продукт следует заранее разморозить при комнатной температуре. Важный момент — аккуратно удалите кишечные нити. Если про них забыть, все впечатление будет испорчено. Давайте приготовим такую быструю закуску на шпажках.',
      'https://www.edimdoma.ru/system/images/contents/0000/7745/wide/AdobeStock_107945057_result.jpeg?1571228213',
      [
        new IngredientModel('креветки', 1),
        new IngredientModel('сухое белое вино', 200),
        new IngredientModel('чеснок', 4)
      ]
    ),
    new RecipeModel(
      'Шашлычок изобилия',
      'Смело включайте в меню вечеринки и другие рецепты закусок на шпажках. Продукты для них можно использовать любые. Главное, чтобы они хорошо сочетались между собой и нравились гостям. К тому же угощение на шпажках удобно есть руками. Овощи и мясо — вполне удачное сочетание.',
      'https://www.edimdoma.ru/system/images/contents/0000/7746/wide/AdobeStock_277953991_result.jpeg?1571228213',
      [
        new IngredientModel('мелкий картофель', 18),
        new IngredientModel('цукини ', 2),
        new IngredientModel('колбаса ', 300)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  onAddIngredients(ingredients: IngredientModel[]) {
    this.slService.addIngredients(ingredients);
  }
}
