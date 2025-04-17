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
  AlertTriangle,
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
import NetworkSwitcher from './NetworkSwitcher';


export default function JoinGame() {
      const { abi, contractAddress } = useContractInfo();
      const { tokenSymbol, isSupportedNetwork, networkName } = useNetworkInfo();
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
  const [activeGames, setActiveGames] = useState<Game>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<number>();
  const [refreshToken, setRefreshToken] = useState('')
  const account = useAccount()
  const userAddress = account.address || undefined
  const isTxnLoading = isPending || isConfirming
  const userContext = useUser();

  const proofedSearchQuery = searchQuery || 0

  const gameResult = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getGameById',
    args: [BigInt(proofedSearchQuery)],
    scopeKey: refreshToken,
    query: {
      enabled: isSupportedNetwork && proofedSearchQuery > 0
    }
  }) 

  const data = gameResult.data as Game | undefined
  const isGameDataError = gameResult.isError

  const handleSearch = async () => {
    if (!isSupportedNetwork) {
      toast.error(`Please connect to ${networkName} to search for games`, {
        icon: '⚠️',
        duration: 3000,
      });
      return;
    }

    if (!searchQuery || searchQuery <= 0) {
      toast.error('Please enter a valid battle ID', {
        icon: '❌',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Reset the token to trigger a refetch
      setRefreshToken(Date.now().toString());
      
      // Small delay to ensure the data is fetched
      setTimeout(() => {
        setActiveGames(data);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Error searching for game:", err);
      setIsLoading(false);
    }
  };

  const handleJoinGame = async(id: bigint | undefined, stake:bigint | undefined) => {
    // Check if network is supported
    if (!isSupportedNetwork) {
      toast.error(`Please connect to ${networkName} to join games`, {
        icon: '⚠️',
        duration: 3000,
      });
      return;
    }

    // Check if user has a wallet
    if (!userContext.user || !userHasWallet(userContext)) {
      toast.error('Please log in with Civic to join a game', {
        duration: 3000,
      });
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
        // Reset form
      }
      setRefreshToken(Date.now().toString())
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
        {/* Network Selector */}
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold text-white'>
            Join Battle
          </h2>
          <NetworkSwitcher />
        </div>

        {!isSupportedNetwork && (
          <div className='bg-red-900/30 border border-red-800 rounded-lg p-4 mb-4 flex items-start gap-3'>
            <AlertTriangle className='h-5 w-5 text-red-400 shrink-0 mt-0.5' />
            <div className='text-sm text-red-300'>
              <p className='font-medium'>Unsupported Network</p>
              <p className='mt-1'>Please switch to Core Mainnet or Testnet to join games.</p>
            </div>
          </div>
        )}

        {/* Search and Refresh Section */}
        <div className='flex gap-4'>
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5' />
            <input
              type='number'
              placeholder='Enter battle ID to join'
              value={searchQuery}
              onChange={(e) => setSearchQuery(Number(e.target.value))}
              className='w-full pl-10 pr-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white'
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading || !isSupportedNetwork}
            className={`p-3 bg-gray-800 border-2 ${isLoading || !isSupportedNetwork ? 'border-gray-700 opacity-60 cursor-not-allowed' : 'border-gray-700 hover:border-blue-500 hover:bg-blue-500/10'} rounded-lg transition-all duration-300`}
          >
            <Search
              className={`w-5 h-5 text-blue-400 ${
                isLoading ? 'animate-spin' : ''
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
            {isGameDataError && (
              <div className='text-center py-8 bg-gray-800 rounded-lg border border-red-800 hover:border-red-700 transition-all duration-300'>
                <AlertTriangle className='w-12 h-12 text-red-500 mx-auto mb-3' />
                <p className='text-red-300'>Error loading game data</p>
                <p className='text-gray-400 text-sm mt-2'>The battle may not exist or there might be a network issue.</p>
                <button
                  onClick={handleSearch}
                  className='mt-4 text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 mx-auto'
                >
                  <RefreshCcw className='w-4 h-4' />
                  TRY AGAIN
                </button>
              </div>
            )}
            {!isGameDataError && !activeGames ? (
              <div className='text-center py-8 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300'>
                <Users className='w-12 h-12 text-gray-600 mx-auto mb-3' />
                <p className='text-gray-400'>No active battles found</p>
                <button
                  onClick={handleSearch}
                  className='mt-4 text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105'
                  disabled={!isSupportedNetwork}
                >
                  <RefreshCcw className='w-4 h-4' />
                  SEARCH FOR BATTLES
                </button>
              </div>
            ) : (
              data && (
                <GameSearchCard
                  game={data}
                  isLoading={isTxnLoading}
                  onJoinGame={() => handleJoinGame(data?.gameId, data?.stake)}
                  userAddress={userAddress}
                />
              )
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
