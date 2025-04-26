export const contractAddress = '0xC97384DE52e31Cc4EBE22e06139e36Bd7F01211D';

export const abi = 
  [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "FailedCall",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "InsufficientBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      inputs: [],
      name: "ReentrancyGuardReentrantCall",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "gameId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "player1",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "stake",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "enum RockPaperScissors.GameType",
          name: "gameType",
          type: "uint8",
        },
      ],
      name: "GameCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "gameId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "winner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "payout",
          type: "uint256",
        },
      ],
      name: "GameEnded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "gameId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "player2",
          type: "address",
        },
      ],
      name: "GameJoined",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "gameId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "player",
          type: "address",
        },
        {
          indexed: false,
          internalType: "enum RockPaperScissors.Choice",
          name: "choice",
          type: "uint8",
        },
      ],
      name: "PlayerMoved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "gameId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "roundNumber",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "enum RockPaperScissors.Choice",
          name: "player1Choice",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "enum RockPaperScissors.Choice",
          name: "player2Choice",
          type: "uint8",
        },
      ],
      name: "RoundPlayed",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "enum RockPaperScissors.GameType",
          name: "_gameType",
          type: "uint8",
        },
      ],
      name: "createGame",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "creatorFee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "games",
      outputs: [
        {
          internalType: "uint256",
          name: "gameId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "stake",
          type: "uint256",
        },
        {
          internalType: "enum RockPaperScissors.GameType",
          name: "gameType",
          type: "uint8",
        },
        {
          internalType: "uint8",
          name: "roundsPlayed",
          type: "uint8",
        },
        {
          internalType: "bool",
          name: "isActive",
          type: "bool",
        },
        {
          internalType: "address",
          name: "lastPlayerMove",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getGameById",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
            {
              internalType: "address[2]",
              name: "players",
              type: "address[2]",
            },
            {
              internalType: "uint256",
              name: "stake",
              type: "uint256",
            },
            {
              internalType: "enum RockPaperScissors.GameType",
              name: "gameType",
              type: "uint8",
            },
            {
              internalType: "uint8",
              name: "roundsPlayed",
              type: "uint8",
            },
            {
              internalType: "uint8[2]",
              name: "scores",
              type: "uint8[2]",
            },
            {
              internalType:
                "enum RockPaperScissors.Choice[2]",
              name: "choices",
              type: "uint8[2]",
            },
            {
              internalType: "bool",
              name: "isActive",
              type: "bool",
            },
            {
              internalType: "address",
              name: "lastPlayerMove",
              type: "address",
            },
            {
              internalType: "enum RockPaperScissors.Choice[]",
              name: "player1Moves",
              type: "uint8[]",
            },
            {
              internalType: "enum RockPaperScissors.Choice[]",
              name: "player2Moves",
              type: "uint8[]",
            },
          ],
          internalType: "struct RockPaperScissors.Game",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256[]",
          name: "gameIds",
          type: "uint256[]",
        },
      ],
      name: "getGamesInfo",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
            {
              internalType: "address[2]",
              name: "players",
              type: "address[2]",
            },
            {
              internalType: "uint256",
              name: "stake",
              type: "uint256",
            },
            {
              internalType: "uint8",
              name: "gameType",
              type: "uint8",
            },
            {
              internalType: "uint8",
              name: "roundsPlayed",
              type: "uint8",
            },
            {
              internalType: "uint8[2]",
              name: "scores",
              type: "uint8[2]",
            },
            {
              internalType: "uint8[2]",
              name: "choices",
              type: "uint8[2]",
            },
            {
              internalType: "bool",
              name: "isActive",
              type: "bool",
            },
            {
              internalType: "address",
              name: "lastPlayerMove",
              type: "address",
            },
            {
              internalType: "enum RockPaperScissors.Choice[]",
              name: "player1Moves",
              type: "uint8[]",
            },
            {
              internalType: "enum RockPaperScissors.Choice[]",
              name: "player2Moves",
              type: "uint8[]",
            },
          ],
          internalType: "struct RockPaperScissors.GameView[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_gameId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "player",
          type: "address",
        },
      ],
      name: "getPlayerMoves",
      outputs: [
        {
          internalType: "enum RockPaperScissors.Choice[]",
          name: "",
          type: "uint8[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
      ],
      name: "getUserGames",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_gameId",
          type: "uint256",
        },
      ],
      name: "joinGame",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_gameId",
          type: "uint256",
        },
        {
          internalType: "enum RockPaperScissors.Choice",
          name: "_choice",
          type: "uint8",
        },
      ],
      name: "makeMove",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "userGames",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  