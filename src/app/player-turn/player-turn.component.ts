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
import { GameState } from '../game-state';

const StateToDisplayDice = [
  GameState.WaitingForSecondRoll,
  GameState.WaitingForThirdRoll,
  GameState.WaitingForFinalCategorySelection
];

const StateToDisplayScoring = [
  GameState.WaitingForSecondRoll,
  GameState.WaitingForThirdRoll,
  GameState.WaitingForFinalCategorySelection
];

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

  scoringCategories = [
    {
      label: 'Ones',
      value: () => this.yachtGame?.getCurrentOnesScore(),
      click: () => this.yachtGame?.recordOnesScore()
    },
    {
      label: 'Twos',
      value: () => this.yachtGame?.getCurrentTwosScore(),
      click: () => this.yachtGame?.recordTwosScore()
    },
    {
      label: 'Threes',
      value: () => this.yachtGame?.getCurrentThreesScore(),
      click: () => this.yachtGame?.recordThreesScore()
    },
    {
      label: 'Fours',
      value: () => this.yachtGame?.getCurrentFoursScore(),
      click: () => this.yachtGame?.recordFoursScore()
    },
    {
      label: 'Fives',
      value: () => this.yachtGame?.getCurrentFivesScore(),
      click: () => this.yachtGame?.recordFivesScore()
    },
    {
      label: 'Sixes',
      value: () => this.yachtGame?.getCurrentSixesScore(),
      click: () => this.yachtGame?.recordSixesScore()
    },
    {
      label: 'Full House',
      value: () => this.yachtGame?.getCurrentFullHouseScore(),
      click: () => this.yachtGame?.recordFullHouseScore()
    },
    {
      label: 'Four-Of-A-Kind',
      value: () => this.yachtGame?.getCurrentFourOfAKindScore(),
      click: () => this.yachtGame?.recordFourOfAKind()
    },
    {
      label: 'Little Straight',
      value: () => this.yachtGame?.getCurrentLittleStraightScore(),
      click: () => this.yachtGame?.recordLittleStraightScore()
    },
    {
      label: 'Big Straight',
      value: () => this.yachtGame?.getCurrentBigStraightScore(),
      click: () => this.yachtGame?.recordBigStraightScore()
    },
    {
      label: 'Choice',
      value: () => this.yachtGame?.getCurrentChoiceScore(),
      click: () => this.yachtGame?.recordChoiceScore()
    },
    {
      label: 'Yacht',
      value: () => this.yachtGame?.getCurrentYachtScore(),
      click: () => this.yachtGame?.recordYachtScore()
    },
  ];

  rollDice() {
    this.yachtGame?.rollDice();
  }

  toggleDieHold(die: Die) {
    die.held = !die.held;
  }

  playerCanRoll(): boolean {
    if (this.yachtGame === undefined) {
      return false;
    }

    return this.yachtGame?.playerCanRoll();
  }

  displayDice(): boolean {
    if (this.yachtGame === undefined) {
      return false;
    }

    return StateToDisplayDice.includes(this.yachtGame?.gameState);
  }

  displayScoring(): boolean {
    if (this.yachtGame === undefined) {
      return false;
    }

    return StateToDisplayScoring.includes(this.yachtGame?.gameState);
  }
}
