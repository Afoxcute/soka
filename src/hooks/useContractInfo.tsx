import { useChainId } from 'wagmi';
import { useState, useEffect } from 'react';
import { abi as testnetAbi, contractAddress as testnetAddress } from '../constants/contractInfo';
import { abi as mainnetAbi, contractAddress as mainnetAddress } from '../constants/contractInfoMainnet';
import { coreDao } from 'wagmi/chains';

// Define Core Testnet chain ID
const CORE_TESTNET_CHAIN_ID = 1115;

export function useContractInfo() {
  const chainId = useChainId();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Check if connected to Core Mainnet (id: 1116) or Core Testnet (id: 1115)
  const isMainnet = isMounted && chainId === coreDao.id;
  const isTestnet = isMounted && chainId === CORE_TESTNET_CHAIN_ID;
  
  // Log the current network and contract info being used
  useEffect(() => {
    if (isMounted && chainId) {
      console.log(`Connected to chain ID: ${chainId}`);
      console.log(`Using ${isMainnet ? 'mainnet' : 'testnet'} contract info`);
    }
  }, [chainId, isMainnet, isMounted]);
  
  // If connected to mainnet, use mainnet contract info
  // If connected to testnet or any other network, use testnet contract info
  return {
    abi: isMainnet ? mainnetAbi : testnetAbi,
    contractAddress: isMainnet 
      ? mainnetAddress as `0x${string}` 
      : testnetAddress as `0x${string}`,
  };
} 