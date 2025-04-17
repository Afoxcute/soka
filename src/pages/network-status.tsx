'use client';

import React, { useState } from 'react';
import { useChainId } from 'wagmi';
import { useNetworkInfo } from '../hooks/useNetworkInfo';
import { checkRpcConnection } from '../utils';
import { ArrowLeftRight, Check, X, Loader2, RefreshCw } from 'lucide-react';
import { baseSepolia } from 'wagmi/chains';

const NetworkStatusPage = () => {
  const chainId = useChainId();
  const { networkName, isSupportedNetwork } = useNetworkInfo();
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string; latency?: number }>>({});
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Base Sepolia RPC endpoints to test
  const BASE_SEPOLIA_RPC_ENDPOINTS = [
    'https://sepolia.base.org',
    'https://base-sepolia-rpc.publicnode.com',
    'https://1rpc.io/base-sepolia',
    'https://base-sepolia.blockpi.network/v1/rpc/public'
  ];
  
  const runDiagnostics = async () => {
    setIsRunningTests(true);
    const results: Record<string, { success: boolean; message: string; latency?: number }> = {};
    
    // Test each endpoint
    for (const endpoint of BASE_SEPOLIA_RPC_ENDPOINTS) {
      try {
        const result = await checkRpcConnection(endpoint);
        results[endpoint] = result;
      } catch (error) {
        results[endpoint] = { 
          success: false, 
          message: error instanceof Error ? error.message : String(error) 
        };
      }
    }
    
    setTestResults(results);
    setIsRunningTests(false);
  };
  
  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white">Network Status</h1>
      </div>
      
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <ArrowLeftRight className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="font-semibold">Current Network</h2>
              <p className="text-sm text-slate-400">Chain ID: {chainId}</p>
            </div>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${isSupportedNetwork ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
            {isSupportedNetwork ? networkName : 'Unsupported Network'}
          </div>
        </div>
        
        {!isSupportedNetwork && (
          <div className="mt-3 mb-6 p-3 bg-red-900/20 border border-red-800/50 rounded-lg text-sm text-red-300">
            Please connect to Base Sepolia network (Chain ID: {baseSepolia.id}) to use this application.
          </div>
        )}
        
        <div className="mt-6">
          <button
            onClick={runDiagnostics}
            disabled={isRunningTests}
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium ${
              isRunningTests 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } transition-colors`}
          >
            {isRunningTests ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Running Diagnostics...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5" />
                <span>Run RPC Connection Tests</span>
              </>
            )}
          </button>
        </div>
        
        {Object.keys(testResults).length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">RPC Endpoints for {networkName}</h3>
            <div className="space-y-3">
              {Object.entries(testResults).map(([endpoint, result]) => (
                <div 
                  key={endpoint}
                  className={`p-4 rounded-lg border ${
                    result.success 
                      ? 'border-green-800 bg-green-900/20' 
                      : 'border-red-800 bg-red-900/20'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {result.success ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                      <span className="font-mono text-sm break-all">{endpoint}</span>
                    </div>
                    {result.latency && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        result.latency < 300 
                          ? 'bg-green-800/40 text-green-400' 
                          : result.latency < 1000 
                            ? 'bg-yellow-800/40 text-yellow-400' 
                            : 'bg-red-800/40 text-red-400'
                      }`}>
                        {result.latency}ms
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-slate-300 ml-7">{result.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-5">
        <h3 className="font-semibold mb-3">Connection Troubleshooting</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span> 
            <span>If all RPC endpoints are failing, check your internet connection</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span> 
            <span>Make sure your wallet is configured to use Base Sepolia network</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span> 
            <span>Some RPC endpoints may experience temporary outages</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span> 
            <span>If you continue to experience issues, try again later or contact support</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NetworkStatusPage; 