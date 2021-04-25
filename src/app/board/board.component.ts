import {Component, OnInit} from '@angular/core';

// tslint:disable:typedef
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  squares: string[];
  xIsNext: boolean;
  winner: string;
  count = 0;

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  ngOnInit(): void {
    this.newGame();
  }

  openPopup() {
    document.getElementsByClassName('popup')[0].classList.add('active');
  }

  closePopup() {
    document.getElementsByClassName('popup')[0].classList.remove('active');
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.count = 0;
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.count++;
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();

    if (this.count === 9 || this.winner) {
      this.openPopup();
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
