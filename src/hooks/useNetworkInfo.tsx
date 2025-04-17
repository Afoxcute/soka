import { useChainId } from 'wagmi';
import { useState, useEffect } from 'react';
import { baseSepolia } from 'wagmi/chains';

export function useNetworkInfo() {
  const chainId = useChainId();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Check if connected to Base Sepolia
  const isBaseSepoliaNetwork = isMounted && chainId === baseSepolia.id;
  const isSupportedNetwork = isBaseSepoliaNetwork;
  
  // Set network details
  const networkName = "Base Sepolia";
  const networkClass = "bg-blue-900/50 text-blue-400";
  const tokenSymbol = "ETH"; // Base Sepolia uses ETH
  const explorerUrl = "https://sepolia.basescan.org";
  
  const getAddressExplorerUrl = (address: string) => {
    return `${explorerUrl}/address/${address}`;
  };

  const getTxExplorerUrl = (txHash: string) => {
    return `${explorerUrl}/tx/${txHash}`;
  };
  
  return {
    chainId,
    isBaseSepoliaNetwork,
    isSupportedNetwork,
    networkName,
    networkClass,
    tokenSymbol,
    explorerUrl,
    getAddressExplorerUrl,
    getTxExplorerUrl,
    isMounted
  };
} 