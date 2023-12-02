import { Die } from './die';
import { GameState } from './game-state';
import { YachtGame } from './yacht-game';

describe('YachtGame', () => {
  it('should be in an unrollable state if all dice are held', () => {
    // Arrange
    const yachtGame = new YachtGame(1);
    yachtGame.gameState = GameState.WaitingForFirstRoll;
    const die = new Die();
    die.held = true;
    yachtGame.dice = [die, die, die, die, die];

    // Act
    const rollableState = yachtGame.playerCanRoll();

    // Assert
    expect(rollableState).toBeFalse();
  });
});
