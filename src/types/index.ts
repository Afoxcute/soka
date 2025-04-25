// Define the type for the game object
export interface Game {
  choices: number[];
  gameId: bigint; 
  gameType: number;
  isActive: boolean;
  lastPlayerMove: string;
  player1Moves: number[];
  player2Moves: number[];
  players: string[];
  roundsPlayed: number;
  scores: number[];
  stake: bigint; 
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
