import { useChainId } from 'wagmi';
import { useState, useEffect } from 'react';
import { coreDao } from 'wagmi/chains';

// Define Core Testnet chain ID
const CORE_TESTNET_CHAIN_ID = 1115;

export function useNetworkInfo() {
  const chainId = useChainId();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Check if connected to Core Mainnet (id: 1116) or Core Testnet (id: 1115)
  const isMainnet = isMounted && chainId === coreDao.id;
  const isTestnet = isMounted && chainId === CORE_TESTNET_CHAIN_ID;
  
  // Determine network name based on chain ID
  let networkName = "Unknown Network";
  let networkClass = "bg-gray-900/50 text-gray-400";
  let tokenSymbol = "CORE"; // Default symbol
  
  if (isMainnet) {
    networkName = "Core Mainnet";
    networkClass = "bg-green-900/50 text-green-400";
    tokenSymbol = "CORE";
  } else if (isTestnet) {
    networkName = "Core Testnet";
    networkClass = "bg-blue-900/50 text-blue-400";
    tokenSymbol = "tCORE";
  }
  
  return {
    chainId,
    isMainnet,
    isTestnet,
    networkName,
    networkClass,
    tokenSymbol,
    isMounted
  };
} 