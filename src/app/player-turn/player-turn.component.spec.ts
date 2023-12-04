import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTurnComponent } from './player-turn.component';
import { YachtGame } from '../yacht-game';

describe('PlayerTurnComponent', () => {
  let component: PlayerTurnComponent;
  let fixture: ComponentFixture<PlayerTurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerTurnComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlayerTurnComponent);
    component = fixture.componentInstance;
    component.yachtGame = new YachtGame(1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Player 1 displayed', () => {
    const playerTurnComponent: HTMLElement = fixture.nativeElement;
    const h1 = playerTurnComponent.querySelector('h1');
    expect(h1?.textContent).toContain('Player 1');
  })
});
