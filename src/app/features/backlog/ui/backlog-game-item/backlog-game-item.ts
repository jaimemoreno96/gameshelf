import { Component, Input } from '@angular/core';
import { BacklogGame } from '../../domain/backlog-game';

@Component({
  imports: [],
  selector: 'backlog-game-item',
  styleUrl: './backlog-game-item.css',
  templateUrl: './backlog-game-item.html',
})
export class BacklogGameItem {
  @Input() backlogGame: BacklogGame | null = null;
}
