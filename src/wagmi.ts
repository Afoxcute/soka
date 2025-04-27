import { http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';

// Export the Base Sepolia chain for wagmi configuration
export const chains = [baseSepolia] as const;

// Use environment variable for RPC URL if available, otherwise fall back to default
const rpcUrl = process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org';

// Export transports for Base Sepolia
export const transports = {
  [baseSepolia.id]: http(rpcUrl),
};
