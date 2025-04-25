import { useChainId } from 'wagmi';
import { useState, useEffect } from 'react';
import { abi as contractAbi, contractAddress } from '../constants/contractInfoBaseSepolia';
import { baseSepolia } from 'wagmi/chains';

export function useContractInfo() {
  const chainId = useChainId();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Check if connected to Base Sepolia
  const isBaseSepolia = isMounted && chainId === baseSepolia.id;
  
  // Log the current network and contract info being used
  useEffect(() => {
    if (isMounted && chainId) {
      console.log(`Connected to chain ID: ${chainId}`);
      console.log(`Using Base Sepolia contract info`);
    }
  }, [chainId, isBaseSepolia, isMounted]);
  
  // Use Base Sepolia contract info
  return {
    abi: contractAbi,
    contractAddress: contractAddress as `0x${string}`,
  };
} 