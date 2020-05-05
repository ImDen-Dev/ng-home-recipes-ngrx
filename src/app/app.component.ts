import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navigate = 'recipes';

  onNavigate(event: string) {
    this.navigate = event;
  }
}
