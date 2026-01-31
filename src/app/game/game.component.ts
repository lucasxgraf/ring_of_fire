import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameInstructionsComponent } from "../game-instructions/game-instructions.component";



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule, GameInstructionsComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  pickCardAnimation = false;
  game: Game = new Game();

  constructor(public dialog: MatDialog,) {
  }
  
  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      console.log(this.game.currentCard);
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

        setTimeout(() => {
          this.game.playedCards.push(this.game.currentCard!)
          this.pickCardAnimation = false;
        }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
