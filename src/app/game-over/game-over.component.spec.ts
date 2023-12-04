import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverComponent } from './game-over.component';
import { YachtGame } from '../yacht-game';

describe('GameOverComponent', () => {
  let component: GameOverComponent;
  let fixture: ComponentFixture<GameOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a single name when there is only one winner', () => {
    // Arrange
    const yachtGame = new YachtGame(2);
    for(let i = 0; i < yachtGame.players.length; i++) {
      yachtGame.players[i].onesScore = i;
      yachtGame.players[i].twosScore = i;
      yachtGame.players[i].threesScore = i;
      yachtGame.players[i].foursScore = i;
      yachtGame.players[i].fivesScore = i;
      yachtGame.players[i].sixesScore = i;
      yachtGame.players[i].fullHouseScore = i;
      yachtGame.players[i].fourOfAKindScore = i;
      yachtGame.players[i].littleStraightScore = i;
      yachtGame.players[i].bigStraightScore = i;
      yachtGame.players[i].choiceScore = i;
      yachtGame.players[i].yachtScore = i;
    }
    component.yachtGame = yachtGame;

    // Act
    const names = component.winningPlayerNames();

    // Assert
    expect(names).toBe('Player 1');
  });

  it('should return all names when there is a tie', () => {
    // Arrange
    const yachtGame = new YachtGame(2);
    for(let i = 0; i < yachtGame.players.length; i++) {
      yachtGame.players[i].onesScore = 5;
      yachtGame.players[i].twosScore = 5;
      yachtGame.players[i].threesScore = 5;
      yachtGame.players[i].foursScore = 5;
      yachtGame.players[i].fivesScore = 5;
      yachtGame.players[i].sixesScore = 5;
      yachtGame.players[i].fullHouseScore = 5;
      yachtGame.players[i].fourOfAKindScore = 5;
      yachtGame.players[i].littleStraightScore = 5;
      yachtGame.players[i].bigStraightScore = 5;
      yachtGame.players[i].choiceScore = 5;
      yachtGame.players[i].yachtScore = 5;
    }
    component.yachtGame = yachtGame;

    // Act
    const names = component.winningPlayerNames();

    // Assert
    expect(names).toBe('Player 1, Player 2');
  });
});
