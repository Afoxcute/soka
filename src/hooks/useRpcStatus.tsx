import { useState, useEffect } from 'react';
import { useChainId, useClient } from 'wagmi';
import toast from 'react-hot-toast';

export function useRpcStatus() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasRpcError, setHasRpcError] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState(0);
  const chainId = useChainId();
  const client = useClient();

  // Ping RPC endpoint to check connectivity
  const checkRpcConnection = async () => {
    if (!client || isConnecting || Date.now() - lastCheckTime < 10000) return;

    try {
      setIsConnecting(true);
      const testChainId = await client.request({
        method: 'eth_chainId'
      });
      
      if (hasRpcError) {
        setHasRpcError(false);
        toast.success('RPC connection restored', {
          id: 'rpc-status',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('RPC connection failed:', error);
      setHasRpcError(true);
      toast((t) => (
        <div className="flex flex-col">
          <span>Unable to connect to network RPC</span>
          <a 
            href="/network-status" 
            className="text-xs text-blue-400 hover:text-blue-300 underline mt-1"
            onClick={() => toast.dismiss(t.id)}
          >
            View network status →
          </a>
        </div>
      ), {
        id: 'rpc-status',
        duration: 10000,
        icon: '⚠️',
      });
    } finally {
      setIsConnecting(false);
      setLastCheckTime(Date.now());
    }
  };

  // Check on mount and when chain changes
  useEffect(() => {
    checkRpcConnection();
    
    // Also listen for global errors
    const handleError = (event: ErrorEvent) => {
      if (
        event.error?.message?.includes('No available RPC node') ||
        event.error?.message?.includes('could not detect network')
      ) {
        setHasRpcError(true);
      }
    };

    window.addEventListener('error', handleError);
    
    // Set up periodic checking
    const intervalId = setInterval(() => {
      if (hasRpcError) {
        checkRpcConnection();
      }
    }, 15000); // Check every 15 seconds if there's an error
    
    return () => {
      window.removeEventListener('error', handleError);
      clearInterval(intervalId);
    };
  }, [chainId, client, hasRpcError]);

  return {
    isConnecting,
    hasRpcError,
    checkRpcConnection,
  };
} 