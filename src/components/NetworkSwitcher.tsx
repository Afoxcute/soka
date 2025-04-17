import React, { useState } from 'react';
import { useChainId, useSwitchChain } from 'wagmi';
import { coreDao } from 'wagmi/chains';
import { useNetworkInfo } from '../hooks/useNetworkInfo';
import { ArrowLeftRight, Check, ChevronDown } from 'lucide-react';
import { useUser } from '@civic/auth-web3/react';
import { userHasWallet } from '@civic/auth-web3';

// Core Testnet chain ID
const CORE_TESTNET_CHAIN_ID = 1115;

const NetworkSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chainId = useChainId();
  const { networkName, networkClass } = useNetworkInfo();
  const { switchChain } = useSwitchChain();
  const userContext = useUser();

  const networks = [
    {
      id: coreDao.id,
      name: 'Core Mainnet',
      icon: '🌐',
      className: 'bg-green-900/50 text-green-400 border-green-800',
    },
    {
      id: CORE_TESTNET_CHAIN_ID,
      name: 'Core Testnet',
      icon: '🧪',
      className: 'bg-blue-900/50 text-blue-400 border-blue-800',
    },
  ];

  const handleNetworkSwitch = (networkId: number) => {
    if (networkId === chainId) return;
    
    if (userContext.user && userHasWallet(userContext)) {
      switchChain({ chainId: networkId });
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-lg px-3 py-1.5 ${networkClass} border border-opacity-30 hover:bg-opacity-80 transition-all duration-200`}
      >
        <ArrowLeftRight className="h-3.5 w-3.5" />
        <span className="text-xs font-medium">{networkName}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-lg border border-gray-700 bg-gray-800 shadow-lg z-50 py-1 animate-fadeIn">
          {networks.map((network) => (
            <button
              key={network.id}
              className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-gray-700 transition-colors ${
                chainId === network.id ? 'font-medium' : ''
              }`}
              onClick={() => handleNetworkSwitch(network.id)}
            >
              <div className="flex items-center gap-2">
                <span>{network.icon}</span>
                <span className={chainId === network.id ? network.className.split(' ')[1] : 'text-gray-200'}>
                  {network.name}
                </span>
              </div>
              {chainId === network.id && (
                <Check className="h-4 w-4 text-green-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NetworkSwitcher; 