import { Game } from '../../games/domain/game';
import { BacklogGameStatus } from './backlog-columns';

export interface BacklogGame {
  id: string;
  backlogId: string;
  game: Game;
  status: BacklogGameStatus;
  priority: BacklogGamePriority;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export type BacklogGamePriority = 'low' | 'medium' | 'high' | 'must-play';
