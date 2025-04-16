import { http } from 'wagmi';
import { coreDao } from "wagmi/chains";
import type { Chain } from 'wagmi/chains';

// Define Core Testnet chain
const coreTestnet = {
  id: 1115,
  name: 'Core Testnet',
  nativeCurrency: { 
    name: 'CORE', 
    symbol: 'tCORE', 
    decimals: 18 
  },
  rpcUrls: {
    default: { 
      http: ['https://rpc.test.btcs.network'] 
    },
    public: {
      http: ['https://rpc.test.btcs.network']
    }
  },
  blockExplorers: {
    default: { 
      name: 'Core Explorer', 
      url: 'https://scan.test.btcs.network/' 
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11' as `0x${string}`,
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;

// Export both chains for wagmi configuration
export const chains = [coreDao, coreTestnet] as const;

// Export transports for both chains
export const transports = {
  [coreDao.id]: http('https://rpc.ankr.com/core'),
  [coreTestnet.id]: http('https://rpc.test.btcs.network'),
};
