'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { formatEther } from 'viem';
import {
  Trophy,
  Timer,
  AlertCircle,
  Gamepad2,
  Swords,
  Users,
  Coins,
  ArrowLeftRight,
  CheckCircle2,
  Circle,
  Crown,
  GamepadIcon,
  CircleDot,
  Clock,
  X,
  Equal,
  Play,
} from 'lucide-react';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from 'wagmi';
import { useContractInfo } from '../../hooks/useContractInfo';
import { useNetworkInfo } from '../../hooks/useNetworkInfo';
import { extractErrorMessages } from '../../utils';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Game, MoveColor, MoveType } from '../../types';
import { ErrorBoundary } from 'react-error-boundary';


const GameInterface = () => {
  const [refreshData, setRefreshData] = useState('');
  const { abi, contractAddress } = useContractInfo();
  const { tokenSymbol } = useNetworkInfo();

  const router = useRouter();
  const account = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { gameId } = router.query;
  const proofedGamedId = Number(gameId) || 0;

  const gamesIdResult = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getGameById',
    args: [BigInt(Number(proofedGamedId))],
    scopeKey: refreshData,
  });

            useWatchContractEvent({
              address: contractAddress,
              abi,
              eventName: 'PlayerMoved',
              onLogs(logs: any) {
                if(logs){
                  setRefreshData(Date.now().toString())
                               const player = logs[0]?.args?.player;
                               if (player === account.address) {
                                 toast.success(`Move successfully made!`, {
                                   duration: 3000,
                                 });
                               } else {
                                 toast.success(`Opponent made move`, {
                                   duration: 30000,
                                 });
                               }
                }
              },
            });


            useWatchContractEvent({
              address: contractAddress,
              abi,
              eventName: 'GameJoined',
              onLogs(logs: any) {
                if (logs) {
                  setRefreshData(Date.now().toString());
                }
              },
            });

  const pending = isPending || isConfirming;

  const [selectedMove, setSelectedMove] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playerMove, setPlayerMove] = useState<number>();
  const gameDetails = gamesIdResult.data as Game
  const userAddress = account.address;
  const gameEnded = !gameDetails?.isActive && gameDetails?.roundsPlayed > 0;

  const handleMakeMove = async () => {
    try {
      await writeContract({
        address: contractAddress,
        abi,
        functionName: 'makeMove',
        args: [BigInt(proofedGamedId), playerMove],
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (isConfirmed) {
      setRefreshData(Date.now().toString());
    }
  }, [isConfirmed]);

  React.useEffect(() => {
    if (error) {
      toast.error(extractErrorMessages(error?.message), {
        duration: 3000,
        icon: '❌',
      });
      console.log(error);
    }
  }, [error]);


  if (!gameDetails) {
    return (
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className='flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6'>
        <Clock className='w-12 h-12 text-blue-500 animate-spin mb-4' />
        <h2 className='text-2xl font-bold'>Loading Game...</h2>
        <p className='text-slate-400'>
          Please wait while we fetch the game details.
        </p>
      </div>
      </ErrorBoundary>
    );
  }

  // Early return for inactive games
  if (!gameDetails?.isActive && gameDetails?.roundsPlayed < 1) {
    return (
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <div className='flex flex-col items-center justify-center min-h-[400px] bg-slate-900 text-white p-6'>
          <div className='bg-slate-800/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm flex flex-col items-center max-w-md w-full'>
            <div className='bg-red-500/10 p-4 rounded-full mb-4'>
              <AlertCircle className='w-12 h-12 text-red-500' />
            </div>
            <h2 className='text-2xl font-bold mb-3'>Game Ended</h2>
            <p className='text-slate-400 text-center mb-6'>
              This game has concluded or is no longer active
            </p>
            <button
              onClick={() => router.push('/games')}
              className='flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors'
            >
              <GamepadIcon className='w-5 h-5' />
              <span>Find New Games</span>
            </button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  // Early return for non-players
  if (userAddress && !gameDetails?.players.includes(userAddress)) {
    return (
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <div className='flex flex-col items-center justify-center min-h-[400px] bg-slate-900 text-white p-6'>
          <div className='bg-slate-800/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm flex flex-col items-center max-w-md w-full'>
            <div className='bg-yellow-500/10 p-4 rounded-full mb-4'>
              <Users className='w-12 h-12 text-yellow-500' />
            </div>
            <h2 className='text-2xl font-bold mb-3'>Not a Player</h2>
            <p className='text-slate-400 text-center mb-6'>
              You are not participating in this game
            </p>
            <button
              onClick={() => router.push('/game')}
              className='flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors'
            >
              <ArrowLeftRight className='w-5 h-5' />
              <span>Browse Games</span>
            </button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  // Early return for waiting for players
  if (
    gameDetails?.players.includes('0x0000000000000000000000000000000000000000')
  ) {
    return (
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <div className='flex flex-col items-center justify-center min-h-[400px] bg-slate-900 text-white p-6'>
          <div className='bg-slate-800/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm flex flex-col items-center max-w-md w-full'>
            <div className='bg-blue-500/10 p-4 rounded-full mb-4 animate-pulse'>
              <Timer className='w-12 h-12 text-blue-500' />
            </div>
            <h2 className='text-2xl font-bold mb-3'>Waiting for Opponent</h2>
            <p className='text-slate-400 text-center'>
              Another player needs to join before the game can begin
            </p>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  const formatAddress = (address: string) => {
    if (address === userAddress) return 'Me';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getGameTypeInfo = (type: number) => {
    switch (Number(type)) {
      case 0:
        return {
          name: 'LIGHTNING DUEL',
          rounds: 1,
          icon: <Gamepad2 className='h-6 w-6 text-emerald-500' />,
          bgColor: 'bg-emerald-500/10',
        };
      case 1:
        return {
          name: 'WARRIOR CLASH',
          rounds: 2,
          icon: <Swords className='h-6 w-6 text-blue-500' />,
          bgColor: 'bg-blue-500/10',
        };
      case 2:
        return {
          name: 'EPIC TOURNAMENT',
          rounds: 5,
          icon: <Crown className='h-6 w-6 text-yellow-500' />,
          bgColor: 'bg-yellow-500/10',
        };
      default:
        return {
          name: 'Unknown',
          rounds: 0,
          icon: <CircleDot className='h-6 w-6 text-gray-500' />,
          bgColor: 'bg-gray-500/10',
        };
    }
  };


  const handleMoveSelection = async (choice: MoveType) => {
    try {
      const moveMapping = {
        Rock: 1,
        Paper: 2,
        Scissors: 3,
      };

      setPlayerMove(moveMapping[choice]);
    } catch (error) {
      console.error('Move submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const gameType = getGameTypeInfo(gameDetails?.gameType);
  const isPlayerTurn = !selectedMove;

    const getMoveButton = (
      moveName: MoveType,
      color: MoveColor,
      emoji: string
    ) => (
      <button
        onClick={() => handleMoveSelection(moveName)}
        disabled={!isPlayerTurn || isSubmitting}
        className={`
        relative flex flex-col items-center justify-center p-6 rounded-xl
        ${
          selectedMove === moveName
            ? `${color.bg} ${color.text}`
            : 'bg-slate-800 hover:bg-slate-700'
        }
        ${isPlayerTurn ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}
        transition-all duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        group
      `}
      >
        <div
          className={`
        p-3 rounded-lg mb-2
        ${
          selectedMove === moveName
            ? color.iconBg
            : 'bg-slate-700 group-hover:bg-slate-600'
        }
        transition-colors
      `}
        >
          <span
            className={selectedMove === moveName ? color.text : 'text-white'}
            style={{ fontSize: '32px' }}
          >
            {emoji}
          </span>
        </div>
        <span className='text-lg font-medium'>{moveName}</span>
      </button>
    );

  const moveColors = {
    Rock: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-500',
      iconBg: 'bg-blue-500/20',
    },
    Paper: {
      bg: 'bg-yellow-500/20',
      text: 'text-yellow-500',
      iconBg: 'bg-yellow-500/20',
    },
    Scissors: {
      bg: 'bg-red-500/20',
      text: 'text-red-500',
      iconBg: 'bg-red-500/20',
    },
  };

  const getMoveIcon = (move: number) => {
    switch (move) {
      case 1:
                return '🗿';
      case 2:
        return '📄';
      case 3:
        return '✂️';
      default:
        return null;
    }
  };

  const getResultIcon = (player1Move: number, player2Move: number) => {
    if (!player1Move || !player2Move) return null;

    if (player1Move === player2Move) {
      return <Equal className='w-4 h-4 text-yellow-500' />;
    }

    const isWin =
      (player1Move === 1 && player2Move === 3) ||
      (player1Move === 2 && player2Move === 1) ||
      (player1Move === 3 && player2Move === 2);

    return isWin ? (
      <CheckCircle2 className='w-4 h-4 text-green-500' />
    ) : (
      <X className='w-4 h-4 text-red-500' />
    );
  };

  const MoveHistory = () => {
    const playerIndex = userAddress && gameDetails?.players.indexOf(userAddress);
    const isPlayer1 = playerIndex === 0;
    const myMoves = isPlayer1
      ? gameDetails?.player1Moves
      : gameDetails?.player2Moves;
    const opponentMoves = isPlayer1
      ? gameDetails?.player2Moves
      : gameDetails?.player1Moves;
    const completedRounds = Math.min(myMoves.length, opponentMoves.length);

    const getResultIcon = (myMove: number, opponentMove: number) => {
      if (myMove === opponentMove) {
        return <Equal className='w-4 h-4 text-yellow-500' />;
      }
      if (
        (myMove === 1 && opponentMove === 3) ||
        (myMove === 2 && opponentMove === 1) ||
        (myMove === 3 && opponentMove === 2)
      ) {
        return <CheckCircle2 className='w-4 h-4 text-green-500' />;
      }
      return <X className='w-4 h-4 text-red-500' />;
    };

    if (completedRounds === 0) {
      return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <div className='mb-4'>
            <h3 className='text-sm font-semibold mb-2'>Move History</h3>
            <div className='p-3 bg-slate-800 rounded-lg text-center text-slate-400 text-sm'>
              No completed rounds yet
            </div>
          </div>
        </ErrorBoundary>
      );
    }

    return (
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <div className='mb-4'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-semibold'>Move History</h3>
            <span className='text-xs text-slate-400'>
              {completedRounds} round{completedRounds > 1 ? 's' : ''}
            </span>
          </div>
          <div className='space-y-2'>
            {Array.from({ length: completedRounds }).map((_, index) => {
              const myMove = myMoves[index];
              const opponentMove = opponentMoves[index];

              return (
                <div
                  key={index}
                  className='flex items-center justify-between p-2 bg-slate-800 rounded-lg'
                >
                  <div className='flex items-center gap-1'>
                    <span className='text-xs text-slate-400 w-4'>
                      {index + 1}
                    </span>
                    <span className='text-xs mr-1'>Me</span>
                    <div className='p-1.5 bg-slate-700 rounded'>
                      {getMoveIcon(myMove)}
                    </div>
                  </div>
                  <div className='flex items-center gap-1'>
                    {getResultIcon(myMove, opponentMove)}
                  </div>
                  <div className='flex items-center gap-1'>
                    <div className='p-1.5 bg-slate-700 rounded'>
                      {getMoveIcon(opponentMove)}
                    </div>
                    <span className='text-xs'>
                      {playerIndex &&
                        formatAddress(gameDetails?.players[1 - playerIndex])}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ErrorBoundary>
    );
  };

  const WaitingForMove = () => (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className='flex flex-col items-center justify-center p-6 bg-slate-800 rounded-xl'>
        <div className='animate-pulse mb-4'>
          <Clock className='w-12 h-12 text-blue-500' />
        </div>
        <h3 className='text-lg font-semibold mb-2'>Waiting for Move</h3>
        <p className='text-slate-400 text-center'>
          {`Waiting for ${formatAddress(
            gameDetails?.players.find((p) => p !== userAddress) ||
              '0x0000000000000000000000000000000000000000'
          )} to make their move`}
        </p>
      </div>
    </ErrorBoundary>
  );

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className='flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4'>
        <div className='w-full max-w-xl bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <div className={`p-2 rounded-lg ${gameType.bgColor}`}>
                {gameType.icon}
              </div>
              <h1 className='text-2xl font-bold'>{gameType.name}</h1>
            </div>

            <div className='flex justify-between items-center px-4 py-2 bg-slate-800 rounded-xl'>
              <div className='flex items-center gap-2'>
                <Trophy className='w-5 h-5 text-indigo-400' />
                <span>Game #{Number(gameDetails?.gameId)}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Circle
                  className={
                    gameDetails?.isActive
                      ? 'w-4 h-4 text-green-500'
                      : 'w-4 h-4 text-red-500'
                  }
                />
                <span className='text-sm'>
                  Round {gameEnded ? Math.min(gameDetails?.roundsPlayed, gameType.rounds) : gameDetails?.roundsPlayed + 1}/{gameType.rounds}
                </span>
              </div>
            </div>
          </div>

          {/* Game Info */}
          <div className='space-y-4 mb-8'>
            {gameEnded && (
              <div className='text-center mb-4'>
                {(() => {
                  const getScore = (
                    address: string | undefined,
                    gameDetails: Game
                  ) => {
                    if (!address) return null;
                    const playerIndex = gameDetails?.players.indexOf(address);
                    return gameDetails?.scores[playerIndex] ?? null;
                  };

                  const userScore =
                    gameDetails && getScore(userAddress, gameDetails);
                  const opponentScore =
                    gameDetails &&
                    getScore(
                      gameDetails?.players.find(
                        (player) => player !== userAddress
                      ),
                      gameDetails
                    );

                  const renderResultMessage = () => {
                    if (userScore === null || opponentScore === null) {
                      return (
                        <p className='text-gray-500'>
                          Game results are unavailable.
                        </p>
                      );
                    }
                    if (userScore > opponentScore) {
                      return (
                        <p className='text-green-500 font-bold'>
                          🎉 You win! 🎉
                        </p>
                      );
                    }
                    if (userScore < opponentScore) {
                      return (
                        <p className='text-red-500 font-bold'>
                          😢 You lose! 😢
                        </p>
                      );
                    }
                    return (
                      <p className='text-yellow-500 font-bold'>
                        🤝 It's a tie! 🤝
                      </p>
                    );
                  };

                  return renderResultMessage();
                })()}
              </div>
            )}
            <div className='flex items-center justify-between p-4 bg-slate-800 rounded-xl'>
              <div className='flex items-center gap-2'>
                <Coins className='w-5 h-5 text-yellow-500' />
                <span>Stake</span>
              </div>
              <span className='font-bold text-yellow-500'>
                {formatEther(gameDetails?.stake)} {tokenSymbol}
              </span>
            </div>
            {gameDetails?.players.map((player, index) => (
              <div
                key={player}
                className={`p-4 rounded-xl ${
                  player === userAddress
                    ? 'bg-indigo-500/10 border border-indigo-500/20'
                    : 'bg-slate-800'
                }`}
              >
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-3'>
                    <div
                      className={`p-2 rounded-lg ${
                        player === userAddress
                          ? 'bg-indigo-500/20'
                          : 'bg-slate-700'
                      }`}
                    >
                      <Users
                        className={`w-5 h-5 ${
                          player === userAddress
                            ? 'text-indigo-500'
                            : 'text-slate-400'
                        }`}
                      />
                    </div>
                    <div>
                      <div className='text-sm text-slate-400'>
                        Player {index + 1}
                      </div>
                      <div className='font-medium'>{formatAddress(player)}</div>
                    </div>
                  </div>
                  <div className='text-2xl font-bold'>
                    {gameDetails?.scores[index]}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <MoveHistory />
          {gameDetails?.lastPlayerMove === userAddress && (
            <div className='flex items-center justify-center mb-4'>
              <span className='text-sm text-slate-400 mr-2'>My last move:</span>
              {gameDetails?.choices[1] === 1 && (
                <span className='text-2xl'>🗿</span>
              )}{' '}
              {gameDetails?.choices[1] === 2 && (
                <span className='text-2xl'>📄</span>
              )}{' '}
              {gameDetails?.choices[1] === 3 && (
                <span className='text-2xl'>✂️</span>
              )}{' '}
              {gameDetails?.choices[0] === 1 && (
                <span className='text-2xl'>🗿</span>
              )}{' '}
              {gameDetails?.choices[0] === 2 && (
                <span className='text-2xl'>📄</span>
              )}{' '}
              {gameDetails?.choices[0] === 3 && (
                <span className='text-2xl'>✂️</span>
              )}{' '}
            </div>
          )}
          {gameDetails?.lastPlayerMove !== userAddress && !gameEnded ? (
            <>
              <div className='grid grid-cols-3 gap-4 mb-6'>
                {getMoveButton('Rock', moveColors.Rock, '🗿')}
                {getMoveButton('Paper', moveColors.Paper, '📄')}
                {getMoveButton('Scissors', moveColors.Scissors, '✂️')}
              </div>

              {playerMove && (
                <button
                  onClick={handleMakeMove}
                  disabled={pending}
                  className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center space-x-2
                  ${
                    !playerMove
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
                  }`}
                >
                  {pending ? (
                    <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  ) : (
                    <>
                      <CheckCircle2 className='w-5 h-5' />
                      <span>Make move</span>
                    </>
                  )}
                </button>
              )}
            </>
          ) : gameDetails?.lastPlayerMove === userAddress ? (
            <WaitingForMove />
          ) : (
            <></>
          )}
          {gameEnded && (
            <Link
              href='/game'
              className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
              `}
            >
              <>
                <Play className='w-5 h-5' />
                <span>Start New Game</span>
              </>
            </Link>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default GameInterface;
