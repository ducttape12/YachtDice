import { Die } from './die';

describe('Die', () => {
  it('should create an instance', () => {
    expect(new Die()).toBeTruthy();
  });

  it('should prevent a value less than 1', () => {
    let die = new Die();
    expect(() => die.value = -1).toThrowError(RangeError);
  });

  it('should allow a valid die value', () => {
    let die = new Die();
    die.value = 3;
  });

  it('should prevent a value greater than 6', () => {
    let die = new Die();
    expect(() => die.value = 7).toThrowError(RangeError);
  });
});
