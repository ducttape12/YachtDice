import { Component, Input } from '@angular/core';
import { Player } from '../player';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-card.component.html',
  styleUrl: './score-card.component.css'
})
export class ScoreCardComponent {
  @Input() players:Player[] = [];
}
