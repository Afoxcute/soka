import { http } from 'wagmi';
import { coreDao } from "wagmi/chains";

// Export the CoreDAO chain
export const chains = [coreDao];

// Export transports for the chain
export const transports = {
  [coreDao.id]: http('https://rpc.ankr.com/core'),
};
