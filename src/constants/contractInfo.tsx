// Base Sepolia contract address
export const contractAddress = '0x1234567890123456789012345678901234567890';

// Contract ABI
export const abi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_gameType",
        "type": "uint256"
      }
    ],
    "name": "createGame",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_gameId",
        "type": "uint256"
      }
    ],
    "name": "joinGame",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_gameId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_move",
        "type": "uint256"
      }
    ],
    "name": "makeMove",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_gameId",
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
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "winner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "gameType",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "roundsToWin",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "roundsPlayed",
            "type": "uint256"
          },
          {
            "internalType": "uint256[]",
            "name": "player1Moves",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "player2Moves",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "player1Score",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "player2Score",
            "type": "uint256"
          },
          {
            "internalType": "uint256[2]",
            "name": "scores",
            "type": "uint256[2]"
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
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
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
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_gameIds",
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
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "winner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "gameType",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "roundsToWin",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "roundsPlayed",
            "type": "uint256"
          },
          {
            "internalType": "uint256[]",
            "name": "player1Moves",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "player2Moves",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "player1Score",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "player2Score",
            "type": "uint256"
          },
          {
            "internalType": "uint256[2]",
            "name": "scores",
            "type": "uint256[2]"
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
        "name": "creator",
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
        "internalType": "uint256",
        "name": "gameType",
        "type": "uint256"
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
        "name": "amount",
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
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "move",
        "type": "uint256"
      }
    ],
    "name": "PlayerMoved",
    "type": "event"
  }
];
  