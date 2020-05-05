import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() currentPage = new EventEmitter<string>();

  onChangePage(page: string) {
    this.currentPage.emit(page);
  }
}
