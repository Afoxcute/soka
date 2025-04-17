'use client';

import React, { useState } from 'react';
import { Trophy, Coins, Swords, Timer, Info, AlertTriangle } from 'lucide-react';
import { parseEther } from 'viem';
import { useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi';
import { useContractInfo } from '../hooks/useContractInfo';
import { useNetworkInfo } from '../hooks/useNetworkInfo';
import toast from 'react-hot-toast';
import { extractErrorMessages } from '../utils';
import { ErrorBoundary } from 'react-error-boundary';
import { userHasWallet } from '@civic/auth-web3';
import { useUser } from '@civic/auth-web3/react';

const GAME_TYPES = [
  {
    id: 0,
    name: 'LIGHTNING DUEL',
    description: 'Single round, winner takes all',
    icon: Timer,
    matches: 'One Round',
  },
  {
    id: 1,
    name: 'WARRIOR CLASH',
    description: 'First to win 2 rounds',
    icon: Swords,
    matches: '2 Rounds',
  },
  {
    id: 2,
    name: 'EPIC TOURNAMENT',
    description: 'First to win 5 rounds',
    icon: Trophy,
    matches: '5 Rounds',
  },
];

export default function CreateGame() {
    const { abi, contractAddress } = useContractInfo();
    const { tokenSymbol, isSupportedNetwork, networkName } = useNetworkInfo();
    const { data: hash, error, isPending, writeContractAsync, writeContract } = useWriteContract();
    const userContext = useUser();

    // Watch for GameCreated events
    useWatchContractEvent({
      address: contractAddress,
      abi,
      eventName: 'GameCreated',
      onLogs(logs: any) {
        const createdGameID = logs && logs[0]?.args?.gameId
        toast.success(`Game of ID ${createdGameID} created`, {
          duration: 3000,
        });
        console.log("Game created event:", logs);
      },
    });
    
    // Track transaction confirmation status
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
      useWaitForTransactionReceipt({
        hash,
      });
        
    const [selectedType, setSelectedType] = useState(0);
    const [stakeAmount, setStakeAmount] = useState<string>('');
  
  const handleCreateGame = async () => {
    if (!stakeAmount) return;

    // Check if network is supported
    if (!isSupportedNetwork) {
      toast.error(`Please connect to ${networkName} to create games`, {
        icon: '⚠️',
        duration: 3000,
      });
      return;
    }

    // Check if user has a wallet
    if (!userContext.user || !userHasWallet(userContext)) {
      toast.error('Please log in with Civic to create a game', {
        duration: 3000,
      });
      return;
    }

    const toastId = toast.loading('Preparing your battle arena...', {
      icon: '⚔️',
      duration: 3000,
    });

    try {
      // Use writeContractAsync for better error handling with async/await
      const txHash = await writeContractAsync({
        address: contractAddress,
        abi,
        functionName: 'createGame',
        args: [BigInt(selectedType)],
        value: parseEther(stakeAmount),
      });

      console.log("Transaction sent:", txHash);

      // Update loading toast when transaction is sent
      toast.loading('Summoning your battle on the blockchain...', {
        id: toastId,
        icon: '⏳',
        duration: 3000,
      });
    } catch (err) {
      console.error('Error creating game:', err);
      
      // Show a more user-friendly error message
      const errorMessage = err instanceof Error ? extractErrorMessages(err.message) : 'Battle creation failed';
      
      toast.error(errorMessage, {
        id: toastId,
        duration: 3000,
        icon: '❌',
      });
    }
  };

    React.useEffect(() => {
      if (isConfirmed) {
        // Reset form
        setSelectedType(0);
        setStakeAmount('');
        
        toast.success('Battle created successfully! 🎮', {
          duration: 3000,
          icon: '🔥',
        });
      }
    }, [isConfirmed]);

    React.useEffect(() => {
      if (error) {
        toast.error(extractErrorMessages(error?.message), {
          duration: 3000,
          icon: '❌',
        });
        console.log("Transaction error:", error);
      }
    }, [error]);

    const isLoading = isPending || isConfirming;

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className='space-y-6 text-white'>
        {/* Section Header */}
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold text-white'>
            Create Battle
          </h2>
        </div>

        {!isSupportedNetwork && (
          <div className='bg-red-900/30 border border-red-800 rounded-lg p-4 mb-4 flex items-start gap-3'>
            <AlertTriangle className='h-5 w-5 text-red-400 shrink-0 mt-0.5' />
            <div className='text-sm text-red-300'>
              <p className='font-medium'>Unsupported Network</p>
              <p className='mt-1'>Please connect to Base Sepolia to create games.</p>
            </div>
          </div>
        )}

        {/* Game Type Selection */}
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-200 flex items-center'>
            <Swords className="w-5 h-5 mr-2 text-blue-400" />
            SELECT YOUR BATTLE MODE
          </h2>
          <div className='grid gap-4'>
            {GAME_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  disabled={!isSupportedNetwork}
                  className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                    !isSupportedNetwork ? 'opacity-60 cursor-not-allowed border-gray-700 bg-gray-800' :
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10 transform scale-105 shadow-lg shadow-blue-500/20'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600 hover:transform hover:scale-102'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      !isSupportedNetwork ? 'bg-gray-700' : 
                      isSelected ? 'bg-blue-500/20' : 'bg-gray-700'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        !isSupportedNetwork ? 'text-gray-400' :
                        isSelected ? 'text-blue-400 animate-pulse' : 'text-gray-400'
                      }`}
                    />
                  </div>
                  <div className='ml-4 flex-1 text-left'>
                    <h3 className='font-medium'>{type.name}</h3>
                    <p className='text-sm text-gray-400'>{type.description}</p>
                  </div>
                  <span className='text-sm font-medium px-3 py-1 rounded-full bg-gray-700'>
                    {type.matches}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stake Amount Input */}
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-200 flex items-center'>
            <Coins className="w-5 h-5 mr-2 text-yellow-400" />
            SET YOUR BATTLE STAKE
          </h2>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Coins className='h-5 w-5 text-yellow-400' />
            </div>
            <input
              type='number'
              step='0.001'
              min='0'
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              disabled={!isSupportedNetwork}
              placeholder={`Enter ${tokenSymbol} amount`}
              className={`w-full pl-10 pr-16 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none ${isSupportedNetwork ? 'focus:border-blue-500' : ''} transition-colors text-white ${!isSupportedNetwork ? 'opacity-60 cursor-not-allowed' : ''}`}
            />
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <span className='text-yellow-400'>{tokenSymbol}</span>
            </div>
          </div>
          <p className='flex items-center text-sm text-gray-400'>
            <Info className='w-4 h-4 mr-1' />
            Stake must be greater than 0 {tokenSymbol}
          </p>
        </div>

        {/* Create Game Button */}
        <button
          onClick={handleCreateGame}
          disabled={!stakeAmount || isLoading || !isSupportedNetwork}
          className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center space-x-2
          ${
            !stakeAmount || !isSupportedNetwork
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300'
          }
        `}
        >
          {isLoading ? (
            <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin' />
          ) : (
            <>
              <Swords className='w-5 h-5' />
              <span>FORGE YOUR BATTLE</span>
            </>
          )}
        </button>
      </div>
    </ErrorBoundary>
  );
}
