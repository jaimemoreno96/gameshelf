import { Component, OnInit } from '@angular/core';
import { BacklogInfo } from '../backlog-info/backlog-info';
import { BACKLOG_COLUMN_LABELS, BacklogGameStatus } from '../../domain/backlog-columns';
import { BacklogColumn } from '../backlog-column/backlog-column';
import { BacklogGame } from '../../domain/backlog-game';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  selector: 'backlog-page',
  templateUrl: './backlog-page.html',
  styleUrl: './backlog-page.css',
  imports: [BacklogInfo, BacklogColumn, CdkDropListGroup],
})
export class BacklogPage implements OnInit {
  readonly backlogColumnLabels = BACKLOG_COLUMN_LABELS;
  readonly userName = 'user152345';

  backlogGames: Record<BacklogGameStatus, BacklogGame[]> = {
    backlog: [
      {
        id: '1',
        backlogId: '1',
        game: {
          id: '1',
          title: 'Game 1',
          description: 'Description for Game 1',
          coverImageUrl: 'https://via.placeholder.com/150',
          releaseDate: new Date(),
          platforms: [],
        },
        status: 'backlog',
        priority: 'high',
        position: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        backlogId: '1',
        game: {
          id: '2',
          title: 'Game 2',
          description: 'Description for Game 2',
          coverImageUrl: 'https://via.placeholder.com/150',
          releaseDate: new Date(),
          platforms: [],
        },
        status: 'backlog',
        priority: 'high',
        position: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        backlogId: '1',
        game: {
          id: '3',
          title: 'Game 3',
          description: 'Description for Game 3',
          coverImageUrl: 'https://via.placeholder.com/150',
          releaseDate: new Date(),
          platforms: [],
        },
        status: 'backlog',
        priority: 'high',
        position: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    playing: [
      {
        id: '4',
        backlogId: '1',
        game: {
          id: '4',
          title: 'Game 4',
          description: 'Description for Game 4',
          coverImageUrl: 'https://via.placeholder.com/150',
          releaseDate: new Date(),
          platforms: [],
        },
        status: 'playing',
        priority: 'medium',
        position: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    'on-hold': [],
    completed: [],
    dropped: [],
  };
  isAddGameDialogOpen: boolean = false;
  ngOnInit(): void {

  }

  closeAddGameDialog() {
    this.isAddGameDialogOpen = false;
  }
}
