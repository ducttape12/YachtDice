import { Component, Input } from '@angular/core';
import { YachtGame } from '../yacht-game';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.css'
})
export class GameOverComponent {
  @Input() yachtGame: YachtGame | undefined;

  winningPlayerNames(): string {
    if(this.yachtGame === undefined) {
      return '';
    }

    const players = this.yachtGame.winningPlayers();
    const names = players.reduce((output, player) => {
      if(output !== '') {
        output += ', ';
      }

      output += player.name;

      return output;
    }, '');

    return names;
  }

}
