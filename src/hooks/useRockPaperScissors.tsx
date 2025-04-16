// import { useWatchContractEvent } from "wagmi";
// import { contractAddress, contractAbi } from "../constants/contractinfomainnet";

// export function useRockPaperScissors(
//   onGameCreated,
//   onGameJoined,
//   onRoundPlayed,
//   onGameEnded
// ) {
//   useWatchContractEvent({
//     address: contractAddress,
//     abi: contractAbi,
//     eventName: "GameCreated",
//     onLogs(logs) {
//       console.log("New logs!", logs);
//     },
//     //   listener(gameId, player1, stake, gameType) {
//     //     onGameCreated?.(gameId, player1, stake, gameType);
//     //   },
//   });
//   useWatchContractEvent({
//     address: contractAddress,
//     abi: contractAbi,
//     eventName: "GameJoined",
//     onLogs(logs) {
//       console.log("New logs!", logs);
//     },
//     //   listener(gameId, player2) {
//     //     onGameJoined?.(gameId, player2);
//     //   },
//   });
//   useWatchContractEvent({
//     address: contractAddress,
//     abi: contractAbi,
//     eventName: "RoundPlayed",
//     onLogs(logs) {
//       console.log("New logs!", logs);
//     },
//     //   listener(gameId, roundNumber, player1Choice, player2Choice) {
//     //     onRoundPlayed?.(gameId, roundNumber, player1Choice, player2Choice);
//     //   },
//   });
//   useWatchContractEvent({
//     address: contractAddress,
//     abi: contractAbi,
//     eventName: "GameEnded",
//     onLogs(logs) {
//       console.log("New logs!", logs);
//     },
//     //   listener(gameId, winner, payout) {
//     //     onGameEnded?.(gameId, winner, payout);
//     //   },
//   });
// }
