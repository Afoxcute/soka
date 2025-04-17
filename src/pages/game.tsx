'use client';

import { useState, useEffect } from 'react';
import { Plus, Users, AlertTriangle } from 'lucide-react';
import CreateGame from '../components/CreateGame';
import JoinGame from '../components/JoinGame';
import { ErrorBoundary } from 'react-error-boundary';
import { useUser } from '@civic/auth-web3/react';
import { userHasWallet } from '@civic/auth-web3';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useNetworkInfo } from '../hooks/useNetworkInfo';
import NetworkSwitcher from '../components/NetworkSwitcher';

export default function GamePage() {
  const [activeTab, setActiveTab] = useState('create');
  const userContext = useUser();
  const router = useRouter();
  const { isSupportedNetwork } = useNetworkInfo();

  // Redirect to home if user is not logged in
  useEffect(() => {
    if (!userContext.user) {
      toast.error('Please log in to access the game features', {
        duration: 3000,
      });
      router.push('/');
    }
  }, [userContext.user, router]);

  // Create wallet if needed
  useEffect(() => {
    const createWalletIfNeeded = async () => {
      if (userContext.user && !userHasWallet(userContext)) {
        try {
          await userContext.createWallet();
          toast.success('Wallet created successfully!');
        } catch (error) {
          toast.error('Failed to create wallet. Please try again.');
        }
      }
    };
    
    createWalletIfNeeded();
  }, [userContext]);

  return (
      <div className='space-y-6'>
        {/* Header with Network Selector */}
        <div className='flex justify-between items-center mb-2'>
          <h1 className='text-xl font-bold text-white'>Battle Arena</h1>
          <NetworkSwitcher />
        </div>

        {/* Network Warning */}
        {!isSupportedNetwork && (
          <div className='bg-red-900/30 border border-red-800 rounded-lg p-4 mb-4 flex items-start gap-3'>
            <AlertTriangle className='h-5 w-5 text-red-400 shrink-0 mt-0.5' />
            <div className='text-sm text-red-300'>
              <p className='font-medium'>Unsupported Network</p>
              <p className='mt-1'>Please switch to Core Mainnet or Testnet to access battle features.</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className='flex space-x-2 bg-gray-800 p-1 rounded-lg'>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              activeTab === 'create'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Plus className='w-4 h-4' />
            <span>Create Game</span>
          </button>
          <button
            onClick={() => setActiveTab('join')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              activeTab === 'join'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className='w-4 h-4' />
            <span>Join Game</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'create' ? <CreateGame /> : <JoinGame />}
      </div>
  );
}
