export interface Game {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  releaseDate: Date;
  platforms: GamePlatform[];
}

export type GamePlatform = 'pc' | 'playstation' | 'xbox' | 'nintendo';
