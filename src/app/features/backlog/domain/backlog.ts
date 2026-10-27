import { BacklogGame } from "./backlog-game";

export interface Backlog {
    id: string;
    name: string;
    description: string;
    userId: string;
    isPublic: boolean;
    isArchived: boolean;    
    backlogGames: BacklogGame[];
    createdAt: string;
    updatedAt: string;
}