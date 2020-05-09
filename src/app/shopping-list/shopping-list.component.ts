import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IngredientModel[] = [];
  private igChangeSub: Subscription;
  selectedIngredient: IngredientModel;
  selectedId: number;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: IngredientModel[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(id: number) {
    this.shoppingListService.startingEditing.next(id);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
