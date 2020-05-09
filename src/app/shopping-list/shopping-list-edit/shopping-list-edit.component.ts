import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IngredientModel } from '../../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editingSub: Subscription;
  editedMode = false;
  editedItemIndex: number;
  editedItem: IngredientModel;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.editingSub = this.shoppingListService.startingEditing.subscribe(
      (index: number) => {
        this.editedMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          ingredient: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const ingredient = new IngredientModel(
      form.value.ingredient,
      form.value.amount
    );
    if (this.editedMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        ingredient
      );
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.clearForm();
  }

  clearForm() {
    this.editedItemIndex = null;
    this.editedMode = false;
    this.slForm.reset();
  }

  deleteItem() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.clearForm();
  }

  ngOnDestroy(): void {
    this.editingSub.unsubscribe();
  }
}
