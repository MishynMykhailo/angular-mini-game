// app.component.ts
import { Component } from '@angular/core';
import { CellStatus, ICells } from './models/cells';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-mini-game';
  cells: ICells[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    state: CellStatus.Neutral,
  }));


}
