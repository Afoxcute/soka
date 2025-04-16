import React from 'react';
import {
  Swords,
  Trophy,
  Gamepad2,
  Users,
  User,
  Copy,
  CircleDollarSign,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { formatEther } from 'viem';
import Link from 'next/link';
import { GameSearchCardProps } from '../types';
import { useNetworkInfo } from '../hooks/useNetworkInfo';
import { userHasWallet } from '@civic/auth-web3';
import { useUser } from '@civic/auth-web3/react';

const GameSearchCard: React.FC<GameSearchCardProps> = ({
  game,
  onJoinGame,
  isLoading,
  userAddress,
}) => {
  const { tokenSymbol } = useNetworkInfo();
  const userContext = useUser();

  // Get the user's address from Civic Auth if available, otherwise fallback to the passed userAddress
  const civicAddress = userHasWallet(userContext) ? userContext.ethereum.address : undefined;
  const effectiveUserAddress = civicAddress || userAddress;

  const getGameTypeInfo = (type: number) => {
    switch (Number(type)) {
      case 0:
        return {
          name: 'LIGHTNING DUEL',
          rounds: 1,
          icon: <Gamepad2 className='h-5 w-5 text-emerald-500' />,
        };
      case 1:
        return {
          name: 'WARRIOR CLASH',
          rounds: 2,
          icon: <Swords className='h-5 w-5 text-blue-500' />,
        };
      case 2:
        return {
          name: 'EPIC TOURNAMENT',
          rounds: 5,
          icon: <Trophy className='h-5 w-5 text-yellow-500' />,
        };
      default:
        return {
          name: 'Unknown',
          rounds: 0,
          icon: <Gamepad2 className='h-5 w-5 text-gray-500' />,
        };
    }
  };

  if (
    !game ||
    (game?.players[0] === '0x0000000000000000000000000000000000000000' &&
      game?.players[1] === '0x0000000000000000000000000000000000000000')
  )
    return (
      <div className='flex flex-col items-center justify-center w-full h-full p-6 bg-gray-800 rounded-lg border-2 border-gray-700'>
        {/* Updated to Game Not Found Component */}
        <Gamepad2 className='w-12 h-12 text-red-500 mb-4' />
        <p className='text-gray-300 text-lg'>
          Game not found. Please check the game ID.
        </p>
      </div>
    );


  const gameTypeInfo = getGameTypeInfo(game?.gameType);
  const formattedStake = formatEther(game?.stake);
  const hasSecondPlayer =
    game?.players[1] !== '0x0000000000000000000000000000000000000000';

   const playerCompleteAndIsUserPlayer =
     hasSecondPlayer && effectiveUserAddress && game?.players.includes(effectiveUserAddress);

  const copyGameId = () => {
    navigator.clipboard.writeText(game?.gameId.toString());
  };

  return (
    <div className='w-full rounded-lg border-2 border-gray-700 bg-gray-800/80 p-6 backdrop-blur-sm hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1'>
      {/* Header Section */}
      <div className='mb-6 flex items-start justify-between'>
        <div className='flex items-start space-x-4'>
          <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-gray-700/50 animate-pulse'>
            {gameTypeInfo.icon}
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <h3 className='text-lg font-semibold text-white'>
                Battle #{game?.gameId.toString()}
              </h3>
              <button
                onClick={copyGameId}
                className='rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-gray-300 transition-colors'
                title='Copy Battle ID'
              >
                <Copy className='h-4 w-4' />
              </button>
              <span
                className={`ml-2 flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium
                ${
                  game?.isActive
                    ? 'bg-green-900/50 text-green-400'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {game?.isActive ? (
                  <>
                    <CheckCircle2 className='h-3 w-3' /> LIVE
                  </>
                ) : (
                  <>
                    <Clock className='h-3 w-3' /> ENDED
                  </>
                )}
              </span>
            </div>
            <div className='mt-1 flex items-center gap-3'>
              <div className='flex items-center gap-1.5 text-gray-400'>
                <CircleDollarSign className='h-4 w-4 text-yellow-500' />
                <span>{formattedStake} {tokenSymbol}</span>
              </div>
              <div className='flex items-center gap-1.5 text-gray-400'>
                {hasSecondPlayer ? (
                  <Users className='h-4 w-4 text-blue-500' />
                ) : (
                  <User className='h-4 w-4 text-blue-500' />
                )}
                <span>{hasSecondPlayer ? '2 WARRIORS' : '1 WARRIOR'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Type and Join Button */}
      <div className='space-y-4'>
        <div className='flex items-center gap-2 text-gray-300'>
          <div className='flex items-center gap-2 rounded-lg bg-gray-700/50 px-3 py-2'>
            {gameTypeInfo.icon}
            <span>{gameTypeInfo.name}</span>
          </div>
        </div>

        {!playerCompleteAndIsUserPlayer && (
          <button
            onClick={() => onJoinGame(game?.gameId, game?.stake)}
            disabled={isLoading || hasSecondPlayer || !userContext.user}
            className={`w-full rounded-lg px-4 py-3 font-medium transition-all duration-300 
            ${
              hasSecondPlayer
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : !userContext.user
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1'
            }
          `}
          >
            <span className='flex items-center justify-center gap-2'>
              {hasSecondPlayer ? (
                <>
                  <Users className='h-5 w-5' />
                  ARENA FULL
                </>
              ) : !userContext.user ? (
                <>
                  <User className='h-5 w-5' />
                  LOGIN REQUIRED
                </>
              ) : isLoading ? (
                <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin' />
              ) : (
                <>
                  <Swords className='h-5 w-5' />
                  JOIN BATTLE
                </>
              )}
            </span>
          </button>
        )}

        {playerCompleteAndIsUserPlayer && (
          <Link href={`/game/${game?.gameId}`} passHref>
            <button className='flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 w-full mt-5 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1'>
              <Swords className='h-5 w-5 mr-2' />
              ENTER BATTLE ARENA
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default GameSearchCard;
