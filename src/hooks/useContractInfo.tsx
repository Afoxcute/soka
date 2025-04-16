import { useChainId } from 'wagmi';
import { useState, useEffect } from 'react';
import { abi as testnetAbi, contractAddress as testnetAddress } from '../constants/contractInfo';

// Define Core Testnet chain ID
const CORE_TESTNET_CHAIN_ID = 1115;

export function useContractInfo() {
  const chainId = useChainId();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Check if connected to Core Testnet (id: 1115)
  const isTestnet = isMounted && chainId === CORE_TESTNET_CHAIN_ID;
  
  // Log the current network and contract info being used
  useEffect(() => {
    if (isMounted && chainId) {
      console.log(`Connected to chain ID: ${chainId}`);
      if (isTestnet) {
        console.log('Using Core Testnet contract');
      } else {
        console.log('Not connected to Core Testnet - please switch network');
      }
    }
  }, [chainId, isTestnet, isMounted]);
  
  // Always use testnet contract info regardless of network
  return {
    abi: testnetAbi,
    contractAddress: testnetAddress as `0x${string}`,
  };
} 