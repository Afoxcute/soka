import React from 'react';
import { useRpcStatus } from '../hooks/useRpcStatus';
import { useNetworkInfo } from '../hooks/useNetworkInfo';
import { AlertTriangle, RefreshCw, Loader2, Check } from 'lucide-react';

interface NetworkStatusProps {
  compact?: boolean; // For more compact display in certain UI areas
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ compact = false }) => {
  const { isConnecting, hasRpcError, checkRpcConnection } = useRpcStatus();
  const { networkName, isSupportedNetwork } = useNetworkInfo();

  if (!isSupportedNetwork) {
    return (
      <div className={`flex items-center ${compact ? 'gap-1' : 'gap-2'} text-red-400 animate-pulse`}>
        <AlertTriangle className={compact ? 'h-3 w-3' : 'h-4 w-4'} />
        <span className={compact ? 'text-xs' : 'text-sm'}>Unsupported Network</span>
      </div>
    );
  }

  if (hasRpcError) {
    return (
      <div 
        className={`flex items-center ${compact ? 'gap-1' : 'gap-2'} text-red-400 cursor-pointer hover:text-red-300`}
        onClick={() => checkRpcConnection()}
        title="Click to retry connection"
      >
        <AlertTriangle className={compact ? 'h-3 w-3' : 'h-4 w-4'} />
        <span className={compact ? 'text-xs' : 'text-sm'}>Connection Error</span>
        <RefreshCw className={`${compact ? 'h-3 w-3' : 'h-4 w-4'} ml-1`} />
      </div>
    );
  }

  if (isConnecting) {
    return (
      <div className={`flex items-center ${compact ? 'gap-1' : 'gap-2'} text-blue-400`}>
        <Loader2 className={`${compact ? 'h-3 w-3' : 'h-4 w-4'} animate-spin`} />
        <span className={compact ? 'text-xs' : 'text-sm'}>Connecting...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${compact ? 'gap-1' : 'gap-2'} text-green-400`}>
      <Check className={compact ? 'h-3 w-3' : 'h-4 w-4'} />
      <span className={compact ? 'text-xs' : 'text-sm'}>{networkName} Connected</span>
    </div>
  );
};

export default NetworkStatus; 