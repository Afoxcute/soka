# Rock-Paper-Scissors on CoreDao

This is a decentralized Rock-Paper-Scissors game built on the CoreDao network. The application allows users to create and join games, track their move history, and view past game results, all while ensuring transparency and fairness through blockchain technology.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Architecture](#architecture)
- Smart Contract Repository           https://github.com/Afoxcute/contract/tree/main

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

- **Home Page**: Provides an overview of the game and a button to navigate to the game tab.
- **Game Tab**: 
  - **Create Game**: Users can create a game by selecting the game type (Lightning Duel, Warrior Clash, Epic Announcement) and setting a stake in Core DAO.
  - **Join Game**: Users can search for existing games using a game ID and join if there is an available slot.
- **Real-Time Gameplay**: Players are notified of their opponent's moves, and results are displayed only after both players have made their moves.
- **History Tab**: Users can view their past games and move history for transparency.

## Architecture

The application is structured as follows:

- **Frontend**: Built with Next.js, utilizing React for the UI and Wagmi for CoreDao interactions.
- **Smart Contracts**: The game logic is implemented in Solidity, ensuring secure and transparent gameplay.
- **Blockchain**: All game states and transactions are recorded on the CoreDao network.

### Key Components

- **Frontend Pages**: 
  - `src/pages/index.tsx`: Home page.
  - `src/pages/game.tsx`: Game creation and joining interface.
  - `src/pages/history.tsx`: Displays the user's game history.
- **Components**: 
  - `CreateGame.tsx`: UI for creating a game.
  - `JoinGame.tsx`: UI for joining a game.
  - `GameInterface.tsx`: Displays the game in progress.



