'use client';

import { useState, useEffect } from 'react';
import { Plus, Users } from 'lucide-react';
import CreateGame from '../components/CreateGame';
import JoinGame from '../components/JoinGame';
import { ErrorBoundary } from 'react-error-boundary';
import { useUser } from '@civic/auth-web3/react';
import { userHasWallet } from '@civic/auth-web3';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function GamePage() {
  const [activeTab, setActiveTab] = useState('create');
  const userContext = useUser();
  const router = useRouter();

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

        {/* Contract Info */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-500/20 p-2 rounded-full mr-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-sm text-gray-300">Running on Base Sepolia network</span>
          </div>
          <a 
            href="https://sepolia.basescan.org/address/0xc97384de52e31cc4ebe22e06139e36bd7f01211d" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center"
          >
            View Contract
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Content */}
        {activeTab === 'create' ? <CreateGame /> : <JoinGame />}
      </div>
  );
}
