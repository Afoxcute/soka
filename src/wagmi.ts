import { http } from 'wagmi';
import { baseSepolia } from "wagmi/chains";

// Export only Base Sepolia chain for wagmi configuration
export const chains = [baseSepolia] as const;

// Export transport for Base Sepolia with multiple RPC endpoints for reliability
export const transports = {
  [baseSepolia.id]: http('https://sepolia.base.org', {
    retryCount: 3,
    timeout: 30_000
  }),
};
