import { useChainId } from 'wagmi';
import { useState, useEffect } from 'react';
import { abi as mainnetAbi, contractAddress as mainnetAddress } from '../constants/contractInfoMainnet';
import { coreDao } from 'wagmi/chains';

export function useContractInfo() {
  const chainId = useChainId();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Check if connected to Core Mainnet (id: 1116)
  const isMainnet = isMounted && chainId === coreDao.id;
  
  // Log the current network and contract info being used
  useEffect(() => {
    if (isMounted && chainId) {
      console.log(`Connected to chain ID: ${chainId}`);
      console.log(`Using mainnet contract info`);
    }
  }, [chainId, isMainnet, isMounted]);
  
  // Use mainnet contract info
  return {
    abi: mainnetAbi,
    contractAddress: mainnetAddress as `0x${string}`,
  };
} 