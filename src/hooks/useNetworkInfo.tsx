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
  
  // Check if connected to Core Mainnet (id: 1116)
  const isMainnet = isMounted && chainId === coreDao.id;
  
  // Determine network name based on chain ID
  let networkName = "Unknown Network";
  let networkClass = "bg-gray-900/50 text-gray-400";
  let tokenSymbol = "CORE"; // Default symbol
  
  if (isMainnet) {
    networkName = "Core Mainnet";
    networkClass = "bg-green-900/50 text-green-400";
    tokenSymbol = "CORE";
  }
  
  return {
    chainId,
    isMainnet,
    isTestnet: false,
    networkName,
    networkClass,
    tokenSymbol,
    isMounted
  };
} 