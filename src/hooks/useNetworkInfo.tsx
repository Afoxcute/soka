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
  const isSupportedNetwork = isMainnet || isTestnet;
  
  // Determine network name based on chain ID
  let networkName = "Unknown Network";
  let networkClass = "bg-gray-900/50 text-gray-400";
  let tokenSymbol = "CORE"; // Default symbol
  let explorerUrl = "https://scan.coredao.org";
  
  if (isMainnet) {
    networkName = "Core Mainnet";
    networkClass = "bg-green-900/50 text-green-400";
    tokenSymbol = "CORE";
    explorerUrl = "https://scan.coredao.org";
  } else if (isTestnet) {
    networkName = "Core Testnet";
    networkClass = "bg-blue-900/50 text-blue-400";
    tokenSymbol = "tCORE";
    explorerUrl = "https://scan.test.btcs.network";
  }

  const getAddressExplorerUrl = (address: string) => {
    return `${explorerUrl}/address/${address}`;
  };

  const getTxExplorerUrl = (txHash: string) => {
    return `${explorerUrl}/tx/${txHash}`;
  };
  
  return {
    chainId,
    isMainnet,
    isTestnet,
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