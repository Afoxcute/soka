// import { useState, useEffect } from "react";
// import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
// import { contractAddress, contractAbi } from "../constants/contractinfomainnet";
// import { toast } from "react-hot-toast";

// export default function GamePlay({ gameData, setGameState, setGameData }) {
//   const [countdown, setCountdown] = useState(3);
//   const [choice, setChoice] = useState(null);
//   const [taps, setTaps] = useState(0);

//   const { data: hash, isPending, writeContract } = useWriteContract();
//   const {
//     isLoading: isConfirming,
//     error,
//     isSuccess: isConfirmed,
//   } = useWaitForTransactionReceipt({ hash });

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (countdown === 0) {
//       setCountdown("Go!");
//       setTimeout(() => {
//         if (choice === null) {
//           handleChoice(1); // Default to Rock if no choice made
//         }
//       }, 2000);
//     }
//   }, [countdown]);

//   useEffect(() => {
//     if (taps === 1 || taps === 2) {
//       const timer = setTimeout(() => handleChoice(taps), 300);
//       return () => clearTimeout(timer);
//     }
//   }, [taps]);

//   useEffect(() => {
//     if (isConfirmed) {
//       toast.success("Successfully played a round");
//     }
//     if (error) {
//       toast.error("Failed to play round" + error);
//     }
//   }, [isConfirmed, error]);

//   const handleTap = () => {
//     if (countdown !== "Go!") return;
//     setTaps((prevTaps) => {
//       const newTaps = prevTaps + 1;
//       if (newTaps === 3) {
//         handleChoice(3);
//       }
//       return newTaps > 3 ? 1 : newTaps;
//     });
//   };

//   const handleChoice = (finalTaps) => {
//     let newChoice;
//     if (finalTaps === 1) newChoice = 1; // Rock
//     else if (finalTaps === 2) newChoice = 3; // Scissors
//     else newChoice = 2; // Paper

//     setChoice(newChoice);
//     try {
//       writeContract({
//         address: contractAddress,
//         abi: contractAbi,
//         functionName: "playRound",
//         args: [gameData.gameId, choice],
//       });
//     } catch (error) {
//       toast.error("Failed to play round" + error);
//     }
//     setGameData((prev) => ({ ...prev, playerChoice: newChoice }));
//     setGameState("result");
//   };

//   return (
//     <div className="mt-8 text-center">
//       <h2 className="text-xl font-semibold mb-4">Game Play</h2>
//       <div className="mb-4 text-2xl font-bold">{countdown}</div>
//       <div className="mb-4">
//         {countdown === "Go!" && (
//           <button
//             className="w-full bg-green-500 text-white p-4 rounded-full text-2xl font-bold hover:bg-green-600"
//             onClick={handleTap}
//           >
//             Tap Here
//           </button>
//         )}
//       </div>
//       <div className="mt-4">Taps: {taps}</div>
//       <div className="mt-4">
//         {choice &&
//           `You chose: ${
//             choice === 1 ? "Rock" : choice === 2 ? "Paper" : "Scissors"
//           }`}
//       </div>
//     </div>
//   );
// }
