export interface IMatchmaking {
  addToQueue(): void;
  removeFromQueue(): void;
  isPlayerInQueue(): boolean
  getNextMatch(): [string, string] | null;
}