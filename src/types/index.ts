// Define the type for the game object
export interface Game {
  gameId: bigint;
  players: [`0x${string}`, `0x${string}`];
  stake: bigint;
  isActive: boolean;
  winner: `0x${string}`;
  gameType: number;
  roundsToWin: number;
  roundsPlayed: number;
  player1Moves: number[];
  player2Moves: number[];
  player1Score: number;
  player2Score: number;
  scores: number[];
  winner1: boolean;
  winner2: boolean;
  lastPlayerMove: string;
  choices: number[];
  roundResolvedAt: bigint;
  roundStartedAt: bigint;
  timeout: bigint;
}

export interface GameSearchCardProps {
  game: Game | undefined;
  onJoinGame: (gameId: bigint, stake: bigint) => void;
  isLoading: boolean;
  userAddress: `0x${string}` | undefined;
}

export interface GameHistoryCardProps {
  game: Game;
  userAddress: `0x${string}` | undefined;
  tokenSymbol: string;
}

export type MoveType = 'Rock' | 'Paper' | 'Scissors';


export type MoveColor = {
  bg: string;
  text: string;
  iconBg: string;
};
