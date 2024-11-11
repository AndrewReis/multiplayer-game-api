import { IMatchmaking } from "../interface";

export class Matchmaking implements IMatchmaking {
  private matchmakingQueue: string[] = [];
  private playerId: string;

  constructor(playerId: string) {
    this.playerId = playerId;
  }

  public addToQueue() {
    this.matchmakingQueue.push(this.playerId);
    console.log(`Player ${this.playerId} added to matchmaking queue`);
  }
  
  public removeFromQueue() {
    const index = this.matchmakingQueue.indexOf(this.playerId);
    if (index !== -1) this.matchmakingQueue.splice(index, 1);
  }
  
  public isPlayerInQueue(): boolean {
    return this.matchmakingQueue.includes(this.playerId);
  }
  
  public getNextMatch(): [string, string] | null {
    if (this.matchmakingQueue.length >= 2) {
      return [this.matchmakingQueue.shift()!, this.matchmakingQueue.shift()!];
    }
    return null;
  }
}
