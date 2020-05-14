import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { RecipesService } from '../recipes/recipes.service';
import { RecipeModel } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put('https://ng-recipe-book-6345b.firebaseio.com/recipes.json', recipes)
      .subscribe(result => {
        console.log(result);
      });
  }

  fetchRecipes() {
    return this.http
      .get<RecipeModel[]>(
        'https://ng-recipe-book-6345b.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap((recipes: RecipeModel[]) => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }
}
