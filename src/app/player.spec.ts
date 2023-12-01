import { Player } from './player';
import { ScoringCategory } from './scoring-category';

describe('Player', () => {
  it('should create an instance', () => {
    expect(new Player('test')).toBeTruthy();
  });

  it('should initialize the player\'s score card', () => {
    let player = new Player('test');

    expect(player.categoryScore.size).toBe(12);
    expect(player.categoryScore.get(ScoringCategory.Ones)).toBeNull();
    expect(player.categoryScore.get(ScoringCategory.Twos)).toBeNull();
    expect(player.categoryScore.get(ScoringCategory.Threes)).toBeNull();
    expect(player.categoryScore.get(ScoringCategory.Fours)).toBeNull();
    expect(player.categoryScore.get(ScoringCategory.Fives)).toBeNull();
    expect(player.categoryScore.get(ScoringCategory.Sixes)).toBeNull();
    expect(player.categoryScore.get(ScoringCategory.FullHouse)).toBeNull();
    expect(player.categoryScore.get(ScoringCategory.FourOfAKind)).toBeNull();
    expect(player.categoryScore.get(ScoringCategory.LittleStraight)).toBeNull();
    expect(player.categoryScore.get(ScoringCategory.BigStraight)).toBeNull();
    expect(player.categoryScore.get(ScoringCategory.Choice)).toBeNull();
    expect(player.categoryScore.get(ScoringCategory.Yacht)).toBeNull();
  });
});
