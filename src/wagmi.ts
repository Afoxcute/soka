import { http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';

// Export the Base Sepolia chain for wagmi configuration
export const chains = [baseSepolia] as const;

// Export transports for Base Sepolia
export const transports = {
  [baseSepolia.id]: http('https://sepolia.base.org'),
};
