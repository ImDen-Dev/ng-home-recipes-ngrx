import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: IngredientModel[] }>;
  private igChangeSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: IngredientModel[] } }>
  ) {}

  ngOnInit(): void {
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: IngredientModel[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    // _________NgRx____________
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(id: number) {
    this.shoppingListService.startingEditing.next(id);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
