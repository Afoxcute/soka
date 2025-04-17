import React, { useState, useEffect } from 'react';
import { useChainId, useSwitchChain } from 'wagmi';
import { coreDao } from 'wagmi/chains';
import { useNetworkInfo } from '../hooks/useNetworkInfo';
import { useRpcStatus } from '../hooks/useRpcStatus';
import { ArrowLeftRight, Check, ChevronDown, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useUser } from '@civic/auth-web3/react';
import { userHasWallet } from '@civic/auth-web3';
import toast from 'react-hot-toast';

// Core Testnet chain ID
const CORE_TESTNET_CHAIN_ID = 1115;

const NetworkSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const chainId = useChainId();
  const { networkName, networkClass, isSupportedNetwork } = useNetworkInfo();
  const { isConnecting, hasRpcError, checkRpcConnection } = useRpcStatus();
  const { switchChain } = useSwitchChain();
  const userContext = useUser();

  useEffect(() => {
    // Close dropdown on chain change
    setIsOpen(false);
    setIsSwitching(false);
  }, [chainId]);

  const networks = [
    {
      id: coreDao.id,
      name: 'Core Mainnet',
      icon: '🌐',
      className: 'bg-green-900/50 text-green-400 border-green-800',
      rpcUrls: [
        'https://rpc.ankr.com/core',
        'https://core.drpc.org'
      ],
    },
    {
      id: CORE_TESTNET_CHAIN_ID,
      name: 'Core Testnet',
      icon: '🧪',
      className: 'bg-blue-900/50 text-blue-400 border-blue-800',
      rpcUrls: [
        'https://rpc.test.btcs.network',
        'https://1115.rpc.thirdweb.com',
        'https://core-testnet.public.blastapi.io'
      ],
    },
  ];

  const handleNetworkSwitch = async (networkId: number) => {
    if (networkId === chainId && !hasRpcError) return;
    
    if (userContext.user && userHasWallet(userContext)) {
      try {
        setIsSwitching(true);
        await switchChain({ chainId: networkId });
        
        // Find the network details
        const network = networks.find(n => n.id === networkId);
        if (network) {
          toast.success(`Switched to ${network.name}`, {
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Network switch failed:", error);
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        
        if (errorMsg.includes("No available RPC node")) {
          toast.error("RPC connectivity issue. Try again or switch to a different network.", {
            duration: 5000,
            icon: '⚠️',
          });
        } else {
          toast.error("Failed to switch network. Please try again.", {
            duration: 3000,
          });
        }
      } finally {
        setIsSwitching(false);
      }
    } else {
      toast.error("Please connect your wallet first");
    }
  };

  // Attempt to reconnect when there's an RPC error
  const handleRetryConnection = async () => {
    if (!chainId) return;
    
    try {
      setIsSwitching(true);
      toast.loading("Attempting to reconnect...", {
        id: "reconnect-attempt",
        duration: 3000,
      });
      
      // Force a check of the RPC connection
      await checkRpcConnection();
      
      // If we still have issues, try switching to the same chain to trigger a reconnection
      if (hasRpcError) {
        await switchChain({ chainId });
      }
      
      toast.success("Reconnection attempt completed", {
        id: "reconnect-attempt",
      });
    } catch (error) {
      console.error("Reconnection failed:", error);
      toast.error("Reconnection failed. Please try a different network.", {
        id: "reconnect-attempt",
      });
    } finally {
      setIsSwitching(false);
    }
  };

  // Find current network details
  const currentNetwork = networks.find(n => n.id === chainId) || networks[0];
  const isLoading = isSwitching || isConnecting;

  return (
    <div className="relative">
      <button
        onClick={() => hasRpcError ? handleRetryConnection() : setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`flex items-center gap-2 rounded-lg px-3 py-1.5 ${hasRpcError ? 'bg-red-900/50 text-red-400 border-red-800' : currentNetwork.className} border border-opacity-30 hover:bg-opacity-80 transition-all duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : hasRpcError ? (
          <RefreshCw className="h-3.5 w-3.5" />
        ) : (
          <ArrowLeftRight className="h-3.5 w-3.5" />
        )}
        <span className="text-xs font-medium">
          {hasRpcError ? "Reconnect" : networkName}
        </span>
        {!hasRpcError && (
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      {isOpen && !hasRpcError && (
        <div className="absolute right-0 mt-1 w-48 rounded-lg border border-gray-700 bg-gray-800 shadow-lg z-50 py-1 animate-fadeIn">
          {networks.map((network) => (
            <button
              key={network.id}
              className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-gray-700 transition-colors ${
                chainId === network.id ? 'font-medium' : ''
              }`}
              onClick={() => handleNetworkSwitch(network.id)}
              disabled={isLoading}
            >
              <div className="flex items-center gap-2">
                <span>{network.icon}</span>
                <span className={chainId === network.id ? network.className.split(' ')[1] : 'text-gray-200'}>
                  {network.name}
                </span>
              </div>
              {chainId === network.id && !hasRpcError && (
                <Check className="h-4 w-4 text-green-400" />
              )}
            </button>
          ))}
          
          <div className="border-t border-gray-700 my-1"></div>
          
          <a 
            href="/network-status"
            className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-gray-700 transition-colors text-blue-400 hover:text-blue-300"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Check Network Status</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default NetworkSwitcher; 