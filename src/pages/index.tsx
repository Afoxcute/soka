'use client';

import type { NextPage } from "next";
import { useAccount, useConnect, useBalance } from 'wagmi';
import { userHasWallet } from '@civic/auth-web3';
import { UserButton, useUser } from '@civic/auth-web3/react';
import { useNetworkInfo } from '../hooks/useNetworkInfo';

import Link from "next/link";
import { Gamepad2, Wallet, Sword, Copy, ArrowLeftRight, Shield, Coins, Trophy, Users } from 'lucide-react';
import Head from "next/head";

const Home: NextPage = () => {
    const { isConnected } = useAccount();
    const userContext = useUser();
    const { tokenSymbol, isBaseSepolia, networkName, networkClass } = useNetworkInfo();

    // Get the address from Civic wallet
    const address = userHasWallet(userContext) 
      ? userContext.ethereum.address
      : undefined;
    
    // Get balance using wagmi hook
    const { data: balance, isLoading } = useBalance({ 
      address
    });

    const formatAddress = (addr: string) => {
      return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const copyAddress = () => {
      if (address) {
        navigator.clipboard.writeText(address);
      }
    };

  return (
    <>
      <Head>
        <title>Blockchain Rock Paper Scissors</title>
        <meta
          name='description'
          content='Challenge players worldwide in the ultimate game of strategy'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex flex-col items-center space-y-8 text-white'>
        <div className='space-y-8'>
          {/* Hero Section */}
          <div className='text-center space-y-4'>
            <h1 className='text-4xl font-bold text-white'>
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500'>
                BATTLE OF ELEMENTS
              </span>
            </h1>
            <p className='text-gray-300 text-lg'>
              Challenge opponents in the ultimate Rock-Paper-Scissors arena on Base Network!
            </p>
          </div>

          {/* Display Wallet Info if connected */}
          {isConnected && userHasWallet(userContext) && (
            <div className='bg-gray-800 p-5 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold text-white flex items-center'>
                  <Wallet className='w-5 h-5 mr-2 text-blue-400' />
                  Your Wallet
                </h2>
                <div className='flex items-center gap-2'>
                  <div className='text-xs px-2 py-1 rounded-full bg-blue-900/50 text-blue-400'>
                    Civic Auth
                  </div>
                </div>
              </div>
              
              {/* Network Info */}
              <div className='p-3 bg-gray-700/30 rounded-lg mb-4'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    <ArrowLeftRight className='h-4 w-4 text-gray-400' />
                    <span className='text-gray-300'>Network</span>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${networkClass}`}>
                    {networkName} {isBaseSepolia ? '✓' : '✗'}
                  </div>
                </div>
              </div>
              
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400'>Address:</span>
                  <div className='flex items-center gap-1'>
                    <span className='text-gray-200 font-mono'>{address && formatAddress(address)}</span>
                    <button onClick={copyAddress} className='p-1 text-gray-400 hover:text-white transition-colors'>
                      <Copy className='w-3 h-3' />
                    </button>
                  </div>
                </div>
                
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400'>Balance:</span>
                  <div className='flex items-center'>
                    {isLoading ? (
                      <span className='text-gray-400'>Loading...</span>
                    ) : balance ? (
                      <span className='text-gray-200 font-medium'>
                        {parseFloat((Number(balance.value) / 1e18).toString()).toFixed(4)} {tokenSymbol}
                      </span>
                    ) : (
                      <span className='text-gray-400'>Unavailable</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1'>
              <div className='flex items-center space-x-3 mb-2'>
                <Coins className='w-6 h-6 text-yellow-400 animate-pulse' />
                <h2 className='text-xl font-semibold text-white'>Stake {tokenSymbol}</h2>
              </div>
              <p className='text-gray-400'>Bet your {tokenSymbol} tokens and win big in thrilling battles!</p>
            </div>

            <div className='bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1'>
              <div className='flex items-center space-x-3 mb-2'>
                <Trophy className='w-6 h-6 text-purple-400 animate-pulse' />
                <h2 className='text-xl font-semibold text-white'>Win Rewards</h2>
              </div>
              <p className='text-gray-400'>Dominate your opponents and claim victory rewards!</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className='pt-4'>
            {!isConnected ? (
              <div className='flex flex-col items-center'>
                <p className='text-gray-400 mb-4'>Log in with Civic to start playing</p>
                <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-lg w-full hover:opacity-95 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/50 transform hover:-translate-y-1'>
                  <UserButton 
                    className='w-full flex items-center justify-center p-4 font-bold text-white bg-gradient-to-r from-blue-500/90 to-purple-500/90 rounded-md hover:from-blue-400 hover:to-purple-400' 
                  />
                </div>
              </div>
            ) : (
              <Link
                href='/game'
                className='bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-8 rounded-lg w-full flex items-center justify-center space-x-2 hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1'
              >
                <Gamepad2 className='w-5 h-5' />
                <span>ENTER THE ARENA</span>
              </Link>
            )}
          </div>

          {/* Additional Info */}
          <div className='text-center text-gray-400 text-sm'>
            <p>Powered by Base Network | Battle with ⚔️ on the blockchain</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
