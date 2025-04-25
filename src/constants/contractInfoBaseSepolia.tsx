// Base Sepolia contract information
export const contractAddress = "0xYourContractAddressHere"; // Replace with your actual contract address on Base Sepolia

// Contract ABI
export const abi = [
  // Game creation
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "gameType",
        "type": "uint8"
      }
    ],
    "name": "createGame",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  // Join game
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      }
    ],
    "name": "joinGame",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  // Play round
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "move",
        "type": "uint8"
      }
    ],
    "name": "playRound",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Get game by ID
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      }
    ],
    "name": "getGameById",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "gameId",
            "type": "uint256"
          },
          {
            "internalType": "address[2]",
            "name": "players",
            "type": "address[2]"
          },
          {
            "internalType": "uint256",
            "name": "stake",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "gameType",
            "type": "uint8"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          },
          {
            "internalType": "uint8",
            "name": "roundsPlayed",
            "type": "uint8"
          },
          {
            "internalType": "uint8[2]",
            "name": "scores",
            "type": "uint8[2]"
          },
          {
            "internalType": "uint8[]",
            "name": "player1Moves",
            "type": "uint8[]"
          },
          {
            "internalType": "uint8[]",
            "name": "player2Moves",
            "type": "uint8[]"
          },
          {
            "internalType": "address",
            "name": "lastPlayerMove",
            "type": "address"
          },
          {
            "internalType": "uint8[]",
            "name": "choices",
            "type": "uint8[]"
          }
        ],
        "internalType": "struct RockPaperScissors.Game",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Get user games
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "player",
        "type": "address"
      }
    ],
    "name": "getUserGames",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Get games info
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "gameIds",
        "type": "uint256[]"
      }
    ],
    "name": "getGamesInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "gameId",
            "type": "uint256"
          },
          {
            "internalType": "address[2]",
            "name": "players",
            "type": "address[2]"
          },
          {
            "internalType": "uint256",
            "name": "stake",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "gameType",
            "type": "uint8"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          },
          {
            "internalType": "uint8",
            "name": "roundsPlayed",
            "type": "uint8"
          },
          {
            "internalType": "uint8[2]",
            "name": "scores",
            "type": "uint8[2]"
          },
          {
            "internalType": "uint8[]",
            "name": "player1Moves",
            "type": "uint8[]"
          },
          {
            "internalType": "uint8[]",
            "name": "player2Moves",
            "type": "uint8[]"
          },
          {
            "internalType": "address",
            "name": "lastPlayerMove",
            "type": "address"
          },
          {
            "internalType": "uint8[]",
            "name": "choices",
            "type": "uint8[]"
          }
        ],
        "internalType": "struct RockPaperScissors.Game[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Events
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "stake",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "gameType",
        "type": "uint8"
      }
    ],
    "name": "GameCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "winner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "payout",
        "type": "uint256"
      }
    ],
    "name": "GameEnded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      }
    ],
    "name": "GameJoined",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "roundNumber",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "player1Choice",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "player2Choice",
        "type": "uint8"
      }
    ],
    "name": "RoundPlayed",
    "type": "event"
  }
]; 