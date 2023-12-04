import { Player } from './player';
import { ScoringCategory } from './scoring-category';

describe('Player', () => {
  it('should create an instance', () => {
    expect(new Player('test')).toBeTruthy();
  });

  it('should list score card as not full when not all values have been recorded', () => {
    // Arrange
    const player = new Player('1');
    player.onesScore = 0;
    player.twosScore = 0;
    player.threesScore = 0;
    player.fivesScore = 0;
    player.sixesScore = 0;
    player.fullHouseScore = 0;
    player.littleStraightScore = 0;
    player.bigStraightScore = 0;
    player.yachtScore = 0;

    // Act
    const scoreCardFull = player.scoreCardFull();

    // Assert
    expect(scoreCardFull).toBeFalse();
  });

  it('should list score card as full when all values have been recorded', () => {
    // Arrange
    const player = new Player('1');
    player.onesScore = 0;
    player.twosScore = 0;
    player.threesScore = 0;
    player.foursScore = 0;
    player.fivesScore = 0;
    player.sixesScore = 0;
    player.fullHouseScore = 0;
    player.fourOfAKindScore = 0;
    player.littleStraightScore = 0;
    player.bigStraightScore = 0;
    player.choiceScore = 0;
    player.yachtScore = 0;

    // Act
    const scoreCardFull = player.scoreCardFull();

    // Assert
    expect(scoreCardFull).toBeTrue();
  })
});
