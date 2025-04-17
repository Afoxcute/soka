import { useChainId } from 'wagmi';
import { useState, useEffect } from 'react';
import { abi, contractAddress } from '../constants/contractInfo';
import { baseSepolia } from 'wagmi/chains';

export function useContractInfo() {
  const chainId = useChainId();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Only Base Sepolia is supported now
  const isBaseSepoliaNetwork = isMounted && chainId === baseSepolia.id;
  
  // Log contract info being used
  useEffect(() => {
    if (isMounted && chainId) {
      console.log(`Connected to chain ID: ${chainId}`);
      console.log(`Using Base Sepolia contract info`);
    }
  }, [chainId, isMounted]);
  
  // Return contract info
  return {
    abi,
    contractAddress: contractAddress as `0x${string}`,
  };
} 