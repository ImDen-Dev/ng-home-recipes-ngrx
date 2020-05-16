import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

import { IngredientModel } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editingSub: Subscription;
  editedMode = false;
  editedItem: IngredientModel;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.editingSub = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editedMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          ingredient: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editedMode = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    const ingredient = new IngredientModel(
      form.value.ingredient,
      form.value.amount
    );
    if (this.editedMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }

    this.clearForm();
  }

  clearForm() {
    this.editedMode = false;
    this.store.dispatch(new ShoppingListActions.StopEditing());
    this.slForm.reset();
  }

  deleteItem() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.clearForm();
  }

  ngOnDestroy(): void {
    this.editingSub.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEditing());
  }
}
