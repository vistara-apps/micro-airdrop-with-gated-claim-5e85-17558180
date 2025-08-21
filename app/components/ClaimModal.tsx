
'use client';

import { useState } from 'react';

interface ClaimModalProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function ClaimModal({ onSuccess, onBack }: ClaimModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'confirm' | 'processing' | 'success'>('confirm');
  const [txHash, setTxHash] = useState<string>('');

  const handleClaim = async () => {
    setIsProcessing(true);
    setStep('processing');

    // Simulate transaction processing
    setTimeout(() => {
      setTxHash('0x1234567890abcdef1234567890abcdef12345678');
      setStep('success');
      setIsProcessing(false);
      
      // Auto-close after success
      setTimeout(() => {
        onSuccess();
      }, 3000);
    }, 3000);
  };

  const renderContent = () => {
    switch (step) {
      case 'processing':
        return (
          <div className="text-center space-y-lg">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div>
              <h3 className="text-lg font-semibold mb-sm">Processing Claim</h3>
              <p className="text-muted text-sm">Please wait while we process your transaction...</p>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-lg">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto animate-bounce-gentle">
              <span className="text-2xl">✓</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-success mb-sm">Claim Successful!</h3>
              <p className="text-muted text-sm mb-md">195 tokens have been sent to your wallet</p>
              {txHash && (
                <button
                  onClick={() => window.open(`https://basescan.org/tx/${txHash}`, '_blank')}
                  className="text-accent text-sm hover:underline"
                >
                  View Transaction ↗
                </button>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-lg">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-sm">Confirm Your Claim</h2>
              <p className="text-muted text-sm">Review your allocation details before claiming</p>
            </div>

            <div className="card bg-surface/50">
              <div className="space-y-md">
                <div className="flex justify-between">
                  <span className="text-muted">Base Allocation:</span>
                  <span className="font-semibold">150 tokens</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Referral Bonus:</span>
                  <span className="font-semibold text-accent">+45 tokens</span>
                </div>
                <div className="border-t border-border pt-md">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total Claim:</span>
                    <span className="font-bold text-accent">195 tokens</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-warning/10 border-warning/20">
              <div className="flex items-start space-x-md">
                <div className="text-warning mt-xs">⚠️</div>
                <div className="text-sm">
                  <div className="font-medium text-warning mb-xs">Important Notes:</div>
                  <ul className="text-muted space-y-xs text-xs">
                    <li>• This action cannot be undone</li>
                    <li>• Tokens will be sent to your connected wallet</li>
                    <li>• Small gas fee may apply</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-md">
              <button
                onClick={onBack}
                className="flex-1 btn-ghost"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handleClaim}
                className="flex-1 btn-accent"
                disabled={isProcessing}
              >
                Claim Now
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="card animate-slide-up">
      {renderContent()}
    </div>
  );
}
