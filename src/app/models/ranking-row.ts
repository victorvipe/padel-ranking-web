export interface RankingRow {
  player: string; // player name
  matchesWon: number;
  matchesPlayed: number;
  gamesWon: number;
  gamesPlayed: number;
  efficiency: number; // original 'effec' renamed to english
  adjust: number;
  effectAdj: number; // adjusted efficiency
  ranking: number;
}
