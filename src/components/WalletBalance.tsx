import React from 'react';
import { userHasWallet } from '@civic/auth-web3';
import { useUser } from '@civic/auth-web3/react';
import { useAccount, useBalance } from 'wagmi';
import { Wallet, Loader2 } from 'lucide-react';
import { useNetworkInfo } from '../hooks/useNetworkInfo';

const WalletBalance: React.FC = () => {
  const userContext = useUser();
  const { isConnected } = useAccount();
  const { tokenSymbol } = useNetworkInfo();
  
  // Get the address from Civic wallet
  const address = userHasWallet(userContext) 
    ? userContext.ethereum.address
    : undefined;
  
  // Get balance using wagmi hook
  const { data: balance, isLoading } = useBalance({ 
    address
  });

  if (!isConnected || !userHasWallet(userContext)) {
    return null;
  }

  return (
    <div className="bg-gray-800 px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
      <Wallet className="h-4 w-4 text-blue-400" />
      {isLoading ? (
        <div className="flex items-center">
          <Loader2 className="h-3 w-3 animate-spin text-gray-400 mr-1" />
          <span className="text-gray-400">Loading...</span>
        </div>
      ) : balance ? (
        <span className="font-medium text-white">
          {parseFloat(formatBalance(balance.value)).toFixed(4)} {tokenSymbol}
        </span>
      ) : (
        <span className="text-gray-400">Balance unavailable</span>
      )}
    </div>
  );
};

// Helper function to format balance
function formatBalance(value: bigint): string {
  return (Number(value) / 1e18).toString();
}

export default WalletBalance; 