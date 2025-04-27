# Base Battle Arena - Rock-Paper-Scissors Game

This is a decentralized Rock-Paper-Scissors game built on the Base Sepolia network. The application allows users to create and join games, track their move history, and view past game results, all while ensuring transparency and fairness through blockchain technology.

## Smart Contract

The game's smart contract is deployed on Base Sepolia and can be viewed at:
[https://sepolia.basescan.org/address/0xc97384de52e31cc4ebe22e06139e36bd7f01211d](https://sepolia.basescan.org/address/0xc97384de52e31cc4ebe22e06139e36bd7f01211d)

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Game Modes](#game-modes)
- [Architecture](#architecture)
- [User Guide](#user-guide)
- [Technical Implementation](#technical-implementation)

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rockpaperscissors.git
   cd rockpaperscissors
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features

- **Authentication**: Secure login using Civic Auth with embedded wallet functionality
- **Network Support**: Built specifically for Base Sepolia testnet
- **Game Creation**: Create custom games with different stakes and game modes
- **Game Joining**: Search and join existing games by game ID
- **Real-Time Gameplay**: Make moves and see results in real-time
- **Game History**: Track all your past games and their outcomes
- **Responsive UI**: Modern, user-friendly interface with visual feedback

## Game Modes

Base Battle Arena offers three different game modes:

1. **LIGHTNING DUEL** - Single round, winner takes all. Perfect for quick games.
2. **WARRIOR CLASH** - First to win 2 rounds. A balanced mode that tests skill and strategy.
3. **EPIC TOURNAMENT** - First to win 5 rounds. For those seeking a more extended battle experience.

Each mode requires a stake in ETH, which is locked in the smart contract until the game concludes.

## Architecture

The application is structured as follows:

- **Frontend**: Built with Next.js, using React for the UI and Wagmi for Base Sepolia interactions.
- **Authentication**: Civic Auth provides secure user authentication and wallet management.
- **Smart Contracts**: The game logic is implemented in Solidity, ensuring secure and transparent gameplay.
- **Blockchain**: All game states and transactions are recorded on the Base Sepolia network.

### Key Components

- **Frontend Pages**:
  - `src/pages/index.tsx`: Home page with app overview and wallet connection.
  - `src/pages/game.tsx`: Main interface for creating and joining games.
  - `src/pages/game/[gameId].tsx`: Active gameplay interface for a specific game.
  - `src/pages/history.tsx`: Displays the user's game history and statistics.

- **Game Components**:
  - `CreateGame.tsx`: UI for creating a new game with customizable settings.
  - `JoinGame.tsx`: UI for searching and joining existing games.
  - `GameSearchCard.tsx`: Card component displaying game information.
  - `GamePlay.tsx`: Interface for making moves during an active game.

- **Network & Contract**:
  - `useNetworkInfo.tsx`: Hook for accessing Base Sepolia network information.
  - `useContractInfo.tsx`: Hook for accessing smart contract details.
  - `contractInfoBaseSepolia.tsx`: Contract address and ABI for Base Sepolia.

## User Guide

### Creating a Game

1. Navigate to the Game tab and select "Create Game"
2. Choose your preferred game mode (Lightning Duel, Warrior Clash, or Epic Tournament)
3. Set your stake amount in ETH
4. Click "FORGE YOUR BATTLE" to create the game
5. Share your game ID with an opponent

### Joining a Game

1. Navigate to the Game tab and select "Join Game"
2. Enter the game ID of the game you wish to join
3. Click "Search" to find the game
4. Review the game details and click "JOIN BATTLE"
5. Confirm the transaction to join the game

### Playing a Game

1. Once both players have joined, the game will begin
2. Each player makes their move (Rock, Paper, or Scissors) during their turn
3. After both players have made their moves, the round result is revealed
4. This continues until a player has won enough rounds according to the game mode
5. Winnings are automatically distributed to the winner's wallet

### Viewing Game History

1. Navigate to the History tab to see a list of all your past games
2. Click on a game to expand and see detailed information
3. View your moves, opponent moves, and the outcome of each round

## Technical Implementation

### Smart Contract Integration

The game interacts with a Solidity smart contract deployed on Base Sepolia. The contract handles:

- Game creation and joining logic
- Stake management and escrow
- Game state management
- Move validation and result determination
- Reward distribution

### Authentication Flow

1. Users authenticate using Civic Auth
2. A wallet is automatically created or connected
3. The wallet is used for all blockchain transactions

### Network Handling

The application is configured to work exclusively with Base Sepolia network:
- Automatic network detection
- Network status notifications
- Support for ETH as the native token

### State Management

- React hooks for local state management
- Contract events for real-time updates
- Wagmi hooks for blockchain interactions

## Development

### Prerequisites

- Node.js 14+ and npm/yarn
- MetaMask or any other Web3 wallet (optional for testing)
- Base Sepolia testnet ETH (available from faucets)

### Environment Setup

The project uses environment variables for configuration. Three files are provided:

1. `.env.example` - Template file with placeholder values
2. `.env.local` - For local development
3. `.env` - For production environment

To set up your environment:

1. Copy `.env.example` to `.env.local` for local development:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your own values in `.env.local`:
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddressHere
   NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
   NEXT_PUBLIC_CIVIC_CLIENT_ID=your-civic-client-id-here
   NEXT_PUBLIC_NETWORK_ID=84532
   NEXT_PUBLIC_APP_NAME=Base Battle Arena
   ```

Required environment variables:
- `NEXT_PUBLIC_CONTRACT_ADDRESS`: Address of the game smart contract on Base Sepolia
- `NEXT_PUBLIC_CIVIC_CLIENT_ID`: Client ID for Civic Auth authentication
- `NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL`: RPC URL for Base Sepolia network



