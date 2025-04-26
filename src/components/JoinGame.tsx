'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Users,
  Coins,
  Timer,
  RefreshCcw,
  ExternalLink,
  Swords,
} from 'lucide-react';
import { formatEther, parseEther } from 'viem';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useContractInfo } from '../hooks/useContractInfo';
import { useNetworkInfo } from '../hooks/useNetworkInfo';
import GameSearchCard from './GameSearchCard';
import toast from 'react-hot-toast';
import { extractErrorMessages } from '../utils';
import { Game } from '../types';
import { ErrorBoundary } from 'react-error-boundary';
import { userHasWallet } from '@civic/auth-web3';
import { useUser } from '@civic/auth-web3/react';


export default function JoinGame() {
  const { abi, contractAddress } = useContractInfo();
  const { tokenSymbol } = useNetworkInfo();
  const {
    data: hash,
    error,
    isPending,
    writeContract,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const [activeGame, setActiveGame] = useState<Game | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<number | undefined>(undefined);
  const [refreshToken, setRefreshToken] = useState(Date.now().toString());
  const account = useAccount();
  const userAddress = account.address || undefined;
  const isTxnLoading = isPending || isConfirming;
  const userContext = useUser();

  // Use a safe default value for the search query
  const safeSearchQuery = searchQuery || 0;

  // Get game data based on the search query
  const { data: gameData, isLoading: isGameDataLoading } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getGameById',
    args: [BigInt(safeSearchQuery)],
    scopeKey: `game-${safeSearchQuery}-${refreshToken}`,
    query: {
      enabled: safeSearchQuery > 0,
    }
  });

  // Convert the result to a Game type
  const game = gameData as Game | undefined;

  const handleSearch = async () => {
    if (!searchQuery || searchQuery <= 0) {
      toast.error('Please enter a valid game ID');
      return;
    }

    setIsLoading(true);
    try {
      // Force a refresh of the query
      setRefreshToken(Date.now().toString());
      
      // Wait a moment for the query to update
      setTimeout(() => {
        setActiveGame(game);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error searching for game:', error);
      toast.error('Failed to search for game');
      setIsLoading(false);
    }
  };

  // Update active game whenever game data changes
  useEffect(() => {
    if (game && searchQuery && searchQuery > 0) {
      setActiveGame(game);
    }
  }, [game, searchQuery]);

  const handleJoinGame = async(id: bigint | undefined, stake:bigint | undefined) => {
    // Check if user has a wallet
    if (!userContext.user || !userHasWallet(userContext)) {
      toast.error('Please log in with Civic to join a game', {
        duration: 3000,
      });
      return;
    }

    if (!id || !stake) {
      toast.error('Invalid game data');
      return;
    }

    const toastId = toast.loading('Preparing to enter the battle arena...',)
    try {
      await writeContract({
        address: contractAddress,
        abi,
        functionName: 'joinGame',
        args: [id],
        value: (stake),
      });
      toast.loading('Summoning your warrior to the battlefield...', {
        id: toastId,
        icon: '⚔️',
        duration: 3000,
      });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to join battle',
        {
          id: toastId,
          duration: 3000,
          icon: '❌',
        }
      );
      console.error('Error joining game:', err);
    }
  }

  useEffect(() => {
    if (isConfirmed) {
      toast.success('You have entered the battle arena! 🎮', {
        duration: 3000,
        icon: '🔥',
      });
      // Refresh token to update game state
      setRefreshToken(Date.now().toString());
      // Reset active game to force a refresh
      setActiveGame(undefined);
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

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className='space-y-6 text-white'>
        {/* Search and Refresh Section */}
        <div className='flex gap-4'>
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5' />
            <input
              type='number'
              placeholder='Enter battle ID to join'
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value ? Number(e.target.value) : undefined)}
              className='w-full pl-10 pr-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white'
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading || isGameDataLoading}
            className='p-3 bg-gray-800 border-2 border-gray-700 rounded-lg hover:border-blue-500 transition-all duration-300 hover:bg-blue-500/10'
          >
            <Search
              className={`w-5 h-5 text-blue-400 ${
                (isLoading || isGameDataLoading) ? 'animate-spin' : ''
              }`}
            />
          </button>
        </div>

        {/* Active Games List */}
        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold text-gray-200 flex items-center'>
              <Swords className="w-5 h-5 mr-2 text-blue-400" />
              FIND YOUR BATTLE
            </h2>
          </div>

          <div className='space-y-4'>
            {!activeGame ? (
              <div className='text-center py-8 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300'>
                <Users className='w-12 h-12 text-gray-600 mx-auto mb-3' />
                <p className='text-gray-400'>No active battles found</p>
                <button
                  onClick={handleSearch}
                  disabled={isLoading || isGameDataLoading || !searchQuery}
                  className='mt-4 text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105'
                >
                  <RefreshCcw className={`w-4 h-4 ${(isLoading || isGameDataLoading) ? 'animate-spin' : ''}`} />
                  SEARCH FOR BATTLES
                </button>
              </div>
            ) : (
              <GameSearchCard
                game={activeGame}
                isLoading={isTxnLoading}
                onJoinGame={(gameId, stake) => handleJoinGame(gameId, stake)}
                userAddress={userAddress}
              />
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
