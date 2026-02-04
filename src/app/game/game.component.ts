import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameInstructionsComponent } from "../game-instructions/game-instructions.component";
import { GameService } from '../services/services.components';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { PlayerMobileComponent } from "../player-mobile/player-mobile.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    GameInstructionsComponent, 
    PlayerMobileComponent,],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  game: Game = new Game();
  gameId!: string;
  playerId!: number;
  gameOver = false;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private services: GameService) {
  }
  
  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];
      this.services.getGameById(this.gameId).subscribe((game: any) => {
        console.log('Game updated', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.playerImages = game.playerImages;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    })
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.stack.length === 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      const card = this.game.stack.pop();
      if (card) {
        this.game.currentCard = card;
        this.game.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame();
        setTimeout(() => {
          this.game.playedCards.push(card);
          this.game.pickCardAnimation = false;
          this.saveGame();
        }, 1000);
      }
    }
  }

  editPlayer(playerId: number) {
    console.log('Edit player', playerId);

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe(change => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId)
        } else {
          this.game.playerImages[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.playerImages.push('1.webp');
        this.saveGame();
      }
    });
  }

  saveGame() {
    this.services.updateGame(this.gameId, this.game.toJson());
  }
}
