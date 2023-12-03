import { Die } from './die';
import { GameState } from './game-state';
import { ScoringCategory } from './scoring-category';
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

  it('should return the requested score when the player doesn\'t have a recorded score', () => {
    // Arrange
    const yachtGame = new YachtGame(1);
    yachtGame.dice = [new Die(2), new Die(1), new Die(3), new Die(1), new Die(5)];

    // Act
    const currentOnesScore = yachtGame.getCurrentValueScore(1, null);

    // Assert
    expect(currentOnesScore).toBe(2);
  });

  it('should return null when the player has a recorded score', () => {
    // Arrange
    const yachtGame = new YachtGame(1);
    yachtGame.currentPlayer().categoryScore.set(ScoringCategory.Ones, 1);
    yachtGame.dice = [new Die(2), new Die(1), new Die(3), new Die(1), new Die(5)];

    // Act
    const currentOnesScore = yachtGame.getCurrentValueScore(1, 5);

    // Assert
    expect(currentOnesScore).toBeNull();
  });

  it('should return null when the player has a full house but already has a recorded full house score', () => {
    // Arrange
    const yachtGame = new YachtGame(1);
    yachtGame.currentPlayer().categoryScore.set(ScoringCategory.FullHouse, 8);
    yachtGame.dice = [new Die(5), new Die(2), new Die(5), new Die(5), new Die(2)];

    // Act
    const currentFullHouseScore = yachtGame.getCurrentFullHouseScore();

    // Assert
    expect(currentFullHouseScore).toBeNull();
  });

  it('should not modify the order of the player\'s dice when checking for a full house', () => {
    // Arrange
    const yachtGame = new YachtGame(1);
    yachtGame.dice = [new Die(5), new Die(2), new Die(5), new Die(3), new Die(1)];

    // Act
    const currentFullHouseScore = yachtGame.getCurrentFullHouseScore();

    // Assert
    expect(currentFullHouseScore).toBe(0);
    expect(yachtGame.dice[0].value).toBe(5);
    expect(yachtGame.dice[1].value).toBe(2);
    expect(yachtGame.dice[2].value).toBe(5);
    expect(yachtGame.dice[3].value).toBe(3);
    expect(yachtGame.dice[4].value).toBe(1);
  });

  it('should correctly score a full house when there are two low and three high', () => {
    // Arrange
    const yachtGame = new YachtGame(1);
    yachtGame.dice = [new Die(5), new Die(2), new Die(5), new Die(5), new Die(2)];

    // Act
    const currentFullHouseScore = yachtGame.getCurrentFullHouseScore();

    // Assert
    expect(currentFullHouseScore).toBe(19);
  });

  it('should correctly score a full house when there are three low and two high', () => {
    // Arrange
    const yachtGame = new YachtGame(1);
    yachtGame.dice = [new Die(5), new Die(2), new Die(2), new Die(5), new Die(2)];

    // Act
    const currentFullHouseScore = yachtGame.getCurrentFullHouseScore();

    // Assert
    expect(currentFullHouseScore).toBe(16);
  });
});
