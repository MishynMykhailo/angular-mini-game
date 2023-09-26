import { Component, Input, OnInit } from '@angular/core';
import { CellStatus, ICells } from 'src/app/models/cells';

@Component({
  selector: 'app-field-cells',
  templateUrl: './field-cells.component.html',
  styleUrls: ['./field-cells.component.scss'],
})
export class FieldCellsComponent implements OnInit {
  ngOnInit(): void {}
  @Input() cells: ICells[] = [];
  // Додаткові змінні для лічильників і таймера
  userScore = 0;
  computerScore = 0;
  isGameRunning = false;
  timer: any;
  // app.component.ts
  startGame(time: number) {
    if (!this.isGameRunning) {
      this.resetGame();
      this.isGameRunning = true;
      this.playRound(time);
    }
  }

  resetGame() {
    this.cells.forEach((cell) => (cell.state = CellStatus.Neutral));
    this.userScore = 0;
    this.computerScore = 0;
    clearTimeout(this.timer);
  }

  playRound(time: number) {
    const availableCells = this.cells.filter(
      (cell) => cell.state === CellStatus.Neutral
    );
    if (availableCells.length === 0) {
      this.endGame();
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const randomCell = availableCells[randomIndex];
    randomCell.state = CellStatus.Active;

    this.timer = setTimeout(() => {
      if (randomCell.state === CellStatus.Active) {
        randomCell.state = CellStatus.Destroy;
        this.computerScore++;
      }
      this.playRound(time);
    }, time);
  }

  cellClicked(cell: ICells) {
    if (cell.state === CellStatus.Active) {
      cell.state = CellStatus.User;
      this.userScore++;
      clearTimeout(this.timer);

      // Перевіряємо, чи гра вже завершилася
      if (this.userScore >= 10 || this.computerScore >= 10) {
        this.endGame();
      } else {
        // Якщо гра не завершилася, починаємо новий раунд через 1 секунду
        setTimeout(() => {
          this.playRound(1000);
        }, 1000);
      }
    }
  }
  endGame() {
    this.isGameRunning = false;
  }
}
