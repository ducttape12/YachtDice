import { Component, Input } from '@angular/core';
import { YachtGame } from '../yacht-game';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapDice1Fill,
  bootstrapDice2Fill,
  bootstrapDice3Fill,
  bootstrapDice4Fill,
  bootstrapDice5Fill,
  bootstrapDice6Fill,
  bootstrapCheck,
  bootstrapX
} from '@ng-icons/bootstrap-icons';
import { Die } from '../die';

@Component({
  selector: 'app-player-turn',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './player-turn.component.html',
  styleUrl: './player-turn.component.css',
  viewProviders: [provideIcons({
    bootstrapDice1Fill,
    bootstrapDice2Fill,
    bootstrapDice3Fill,
    bootstrapDice4Fill,
    bootstrapDice5Fill,
    bootstrapDice6Fill,
    bootstrapCheck,
    bootstrapX
  })]
})
export class PlayerTurnComponent {
  @Input() yachtGame: YachtGame | undefined;

  rollDice() {
    this.yachtGame?.rollDice();
  }

  toggleDieHold(die: Die) {
    die.held = !die.held;
  }
}
