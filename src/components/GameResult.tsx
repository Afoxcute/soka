// import { useReadContract } from "wagmi";
// import { contractAddress, contractAbi } from "../constants/contractinfomainnet";

// export default function GameResult({ gameData, setGameState }) {
//   const {
//     data: gameState,
//     status,
//     isLoading,
//     error,
//   } = useReadContract({
//     abi: contractAbi,
//     address: contractAddress,
//     functionName: "getGameState",
//     args: [gameData.gameId],
//   });

//   const renderResult = () => {
//     if (!gameState) return "Loading...";

//     const [players, stake, gameType, roundsPlayed, scores, isActive] =
//       gameState;
//     const playerIndex = players[0] === gameData.playerAddress ? 0 : 1;
//     const opponentIndex = 1 - playerIndex;

//     if (isActive) {
//       return "Waiting for opponent...";
//     }

//     const playerScore = scores[playerIndex];
//     const opponentScore = scores[opponentIndex];

//     if (playerScore === opponentScore) {
//       return "It's a tie!";
//     } else if (playerScore > opponentScore) {
//       return "You won!";
//     } else {
//       return "You lost.";
//     }
//   };

//   return (
//     <div className="mt-8 text-center">
//       {isLoading ? (
//         <div>Loading</div>
//       ) : error ? (
//         <div className="text-red-500">Error</div>
//       ) : (
//         <>
//           <h2 className="text-xl font-semibold mb-4">Game Result</h2>
//           <div className="mb-4 text-2xl font-bold">{renderResult()}</div>
//           <button
//             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//             onClick={() => setGameState("creation")}
//           >
//             Play Again
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
