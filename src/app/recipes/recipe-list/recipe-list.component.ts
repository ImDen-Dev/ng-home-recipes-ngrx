import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';

import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[] = [];
  recipesSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.recipesSub = this.store
      .select('recipes')
      .pipe(map(recipesData => recipesData.recipes))
      .subscribe(recipes => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy(): void {
    this.recipesSub.unsubscribe();
  }
}
