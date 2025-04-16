import { useChainId } from 'wagmi';
import { useState, useEffect } from 'react';

// Define Core Testnet chain ID
const CORE_TESTNET_CHAIN_ID = 1115;

export function useNetworkInfo() {
  const chainId = useChainId();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Check if connected to Core Testnet (id: 1115)
  const isTestnet = isMounted && chainId === CORE_TESTNET_CHAIN_ID;
  
  // Determine network name based on chain ID
  let networkName = "Unknown Network";
  let networkClass = "bg-gray-900/50 text-gray-400";
  let tokenSymbol = "tCORE"; // Default to testnet symbol
  
  if (isTestnet) {
    networkName = "Core Testnet";
    networkClass = "bg-blue-900/50 text-blue-400";
    tokenSymbol = "tCORE";
  }
  
  return {
    chainId,
    isMainnet: false,
    isTestnet,
    networkName,
    networkClass,
    tokenSymbol,
    isMounted
  };
} 