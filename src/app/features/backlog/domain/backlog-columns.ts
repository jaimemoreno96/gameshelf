export const BACKLOG_COLUMNS = [
  'backlog',
  'playing',
  'on-hold',
  'completed',
  'dropped',
] as const;

export type BacklogGameStatus = (typeof BACKLOG_COLUMNS)[number];

export const BACKLOG_COLUMN_LABELS: Record<BacklogGameStatus, string> = {
  backlog: 'Backlog',
  playing: 'Playing',
  'on-hold': 'On Hold',
  completed: 'Completed',
  dropped: 'Dropped',
};
