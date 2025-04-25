import { useChainId } from 'wagmi';
import { useState, useEffect } from 'react';
import { baseSepolia } from 'wagmi/chains';

export function useNetworkInfo() {
  const chainId = useChainId();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Check if connected to Base Sepolia (id: 84532)
  const isBaseSepolia = isMounted && chainId === baseSepolia.id;
  
  // Determine network name based on chain ID
  let networkName = "Unknown Network";
  let networkClass = "bg-gray-900/50 text-gray-400";
  let tokenSymbol = "ETH"; // Default symbol
  
  if (isBaseSepolia) {
    networkName = "Base Sepolia";
    networkClass = "bg-blue-900/50 text-blue-400";
    tokenSymbol = "ETH";
  }
  
  return {
    chainId,
    isMainnet: false,
    isTestnet: isBaseSepolia,
    isBaseSepolia,
    networkName,
    networkClass,
    tokenSymbol,
    isMounted
  };
} 