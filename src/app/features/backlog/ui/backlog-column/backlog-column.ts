import { Component, Input } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnter,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BacklogGame } from '../../domain/backlog-game';
import { BacklogGameItem } from '../backlog-game-item/backlog-game-item';

@Component({
  selector: 'backlog-column',
  styleUrl: './backlog-column.css',
  templateUrl: './backlog-column.html',
  imports: [BacklogGameItem, CdkDropList, CdkDrag],
})
export class BacklogColumn {
  @Input() status: string = '';
  @Input() label: string = '';
  @Input() backlogGames: BacklogGame[] = [];

  drop(event: CdkDragDrop<BacklogGame[]>) {
    console.log('Dropped item:', event.item.data);
    console.log('Backlog games: ', this.backlogGames);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container?.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(
        'Moving item between containers: ',
        event.previousContainer?.data,
        event.container?.data,
        event.previousIndex,
        event.currentIndex,
      );

      transferArrayItem(
        event.previousContainer?.data,
        event.container?.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  listEntered(event: CdkDragEnter<BacklogGame[], BacklogGame[]>) {
    console.log('List entered:', event);
  }
}
