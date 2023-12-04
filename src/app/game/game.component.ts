import { Component, Input } from '@angular/core';
import { YachtGame } from '../yacht-game';
import { CommonModule } from '@angular/common';
import { ScoreCardComponent } from '../score-card/score-card.component';
import { PlayerTurnComponent } from '../player-turn/player-turn.component';
import { GameOverComponent } from '../game-over/game-over.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, ScoreCardComponent, PlayerTurnComponent, GameOverComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  yachtGame:YachtGame | undefined = undefined;
  sodas = ['Mountain Dew', 'Coke Zero'];

  @Input() set playerCount(value: number) {
    this.yachtGame = new YachtGame(value);
  }

  soda() {
    if(this.yachtGame === undefined) {
      return;
    }
    this.yachtGame.players[0].name = 'Mountain Dew!';
  }
}
