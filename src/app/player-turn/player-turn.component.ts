import { Component, Input } from '@angular/core';
import { YachtGame } from '../yacht-game';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-turn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-turn.component.html',
  styleUrl: './player-turn.component.css'
})
export class PlayerTurnComponent {
  @Input() yachtGame:YachtGame | undefined;
}
