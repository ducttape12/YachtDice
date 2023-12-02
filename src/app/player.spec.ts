import { Player } from './player';
import { ScoringCategory } from './scoring-category';

describe('Player', () => {
  it('should create an instance', () => {
    expect(new Player('test')).toBeTruthy();
  });
});
