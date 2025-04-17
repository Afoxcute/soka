import React, { useState } from 'react';
import { useAccount, useBalance, useWriteContract, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { Wallet, ArrowRight, Send } from 'lucide-react';
import { formatEther, parseEther } from 'viem';
import { userHasWallet } from '@civic/auth-web3';
import { useUser } from '@civic/auth-web3/react';
import { useNetworkInfo } from '../hooks/useNetworkInfo';
import toast from 'react-hot-toast';
import { extractErrorMessages } from '../utils';

const WalletBalance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const userContext = useUser();
  const { tokenSymbol } = useNetworkInfo();
  
  // Get the address from Civic wallet
  const address = userHasWallet(userContext) 
    ? userContext.ethereum.address
    : undefined;
  
  // Get balance using wagmi hook
  const { data: balance } = useBalance({ 
    address,
  });
  
  // Use wagmi's sendTransaction hook
  const { sendTransactionAsync } = useSendTransaction();
  const { data: txHash, isPending } = useWriteContract();
  
  // Track transaction status
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });
  
  // Process the transaction
  const handleSendTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !amount) {
      toast.error('Please enter both recipient address and amount');
      return;
    }
    
    // Validate address format
    if (!recipient.startsWith('0x') || recipient.length !== 42) {
      toast.error('Please enter a valid wallet address');
      return;
    }
    
    // Check if amount is a valid number
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    // Check if user has sufficient balance
    if (balance && parseEther(amount) > balance.value) {
      toast.error('Insufficient balance');
      return;
    }
    
    setIsSending(true);
    const toastId = toast.loading('Preparing transaction...');
    
    try {
      // Send the transaction
      const hash = await sendTransactionAsync({
        to: recipient as `0x${string}`,
        value: parseEther(amount),
      });
      
      console.log('Transaction sent:', hash);
      
      toast.loading('Transaction submitted, waiting for confirmation...', {
        id: toastId,
      });
      
      // Close modal
      setIsModalOpen(false);
      setRecipient('');
      setAmount('');
      
    } catch (error) {
      console.error('Transaction failed:', error);
      const errorMessage = error instanceof Error 
        ? extractErrorMessages(error.message) 
        : 'Transaction failed';
        
      toast.error(errorMessage, {
        id: toastId,
      });
    } finally {
      setIsSending(false);
    }
  };
  
  // Reset form after transaction confirmation
  React.useEffect(() => {
    if (isConfirmed) {
      toast.success('Transaction confirmed!');
    }
  }, [isConfirmed]);
  
  if (!balance) return null;
  
  const formattedBalance = formatEther(balance.value);
  const displayBalance = Number(formattedBalance) < 0.0001 
    ? '<0.0001' 
    : parseFloat(Number(formattedBalance).toFixed(4)).toString();
  
  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        title="View balance & send tokens"
      >
        <Wallet className="h-4 w-4 text-blue-400" />
        <span className="text-white text-sm font-semibold">{displayBalance}</span>
      </button>
      
      {/* Send Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-800 rounded-lg p-5 w-full max-w-md border border-gray-700 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Send {tokenSymbol}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4 p-3 bg-gray-700/30 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Your Balance:</span>
                <span className="text-white font-medium">{displayBalance} {tokenSymbol}</span>
              </div>
            </div>
            
            <form onSubmit={handleSendTransaction}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Recipient Address</label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="0x..."
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Amount ({tokenSymbol})</label>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSending || isPending || isConfirming}
                  className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2
                    ${isSending || isPending || isConfirming
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
                    }`}
                >
                  {isSending || isPending || isConfirming ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send {tokenSymbol}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletBalance; 