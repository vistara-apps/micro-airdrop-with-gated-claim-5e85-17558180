
'use client';

import { useState } from 'react';

interface GateVerificationProps {
  onVerified: () => void;
  onBack: () => void;
}

export function GateVerification({ onVerified, onBack }: GateVerificationProps) {
  const [verificationStep, setVerificationStep] = useState<'choose' | 'social' | 'nft' | 'token' | 'processing' | 'success'>('choose');
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const verificationMethods = [
    {
      id: 'social',
      title: 'Social Verification',
      description: 'Connect Twitter & Discord accounts',
      icon: '🔗',
      requirements: ['Twitter account (100+ followers)', 'Discord account (member for 30+ days)'],
      difficulty: 'Easy'
    },
    {
      id: 'nft',
      title: 'NFT Holder',
      description: 'Hold qualifying NFTs',
      icon: '🖼️',
      requirements: ['Base ecosystem NFT', 'Minimum 0.1 ETH floor price'],
      difficulty: 'Medium'
    },
    {
      id: 'token',
      title: 'Token Holder',
      description: 'Hold minimum token balance',
      icon: '💰',
      requirements: ['100+ USDC on Base', '0.01+ ETH on Base'],
      difficulty: 'Easy'
    }
  ];

  const handleVerification = async (method: string) => {
    setSelectedMethod(method);
    setVerificationStep('processing');
    
    // Simulate verification process
    setTimeout(() => {
      setVerificationStep('success');
      setTimeout(() => {
        onVerified();
      }, 2000);
    }, 3000);
  };

  const renderContent = () => {
    switch (verificationStep) {
      case 'processing':
        return (
          <div className="text-center space-y-lg">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div>
              <h3 className="text-lg font-semibold mb-sm">Verifying...</h3>
              <p className="text-muted text-sm">
                {selectedMethod === 'social' && 'Checking your social media accounts...'}
                {selectedMethod === 'nft' && 'Scanning your NFT collection...'}
                {selectedMethod === 'token' && 'Verifying your token balances...'}
              </p>
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
              <h3 className="text-lg font-semibold text-success mb-sm">Verification Complete!</h3>
              <p className="text-muted text-sm">You can now claim your token allocation</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-xl">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-sm">Verify Your Eligibility</h2>
              <p className="text-muted text-sm">Choose a verification method to unlock your allocation</p>
            </div>

            <div className="space-y-md">
              {verificationMethods.map((method) => (
                <div key={method.id} className="card hover:border-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-start space-x-md">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center text-2xl">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-sm">
                        <h3 className="font-semibold">{method.title}</h3>
                        <span className={`text-xs px-sm py-xs rounded-full ${
                          method.difficulty === 'Easy' 
                            ? 'bg-success/20 text-success' 
                            : 'bg-warning/20 text-warning'
                        }`}>
                          {method.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-muted mb-md">{method.description}</p>
                      <div className="space-y-xs">
                        {method.requirements.map((req, i) => (
                          <div key={i} className="flex items-center space-x-xs text-xs text-muted">
                            <span className="text-accent">•</span>
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleVerification(method.id)}
                        className="w-full mt-md btn-accent text-sm"
                      >
                        Verify with {method.title}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card bg-primary/10 border-primary/20">
              <div className="flex items-start space-x-md">
                <div className="text-primary mt-xs">ℹ️</div>
                <div className="text-sm">
                  <div className="font-medium text-primary mb-xs">Why Verification?</div>
                  <div className="text-muted text-xs">
                    Verification prevents bots and ensures fair distribution to real community members. 
                    Your data is only used for verification and never stored.
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onBack}
              className="w-full btn-ghost"
            >
              Back to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="card animate-slide-up">
      {verificationStep !== 'choose' && (
        <div className="flex items-center justify-between mb-lg">
          <button
            onClick={() => setVerificationStep('choose')}
            className="text-muted hover:text-text transition-colors"
          >
            ← Back
          </button>
          <h2 className="text-lg font-semibold">Verification</h2>
          <div></div>
        </div>
      )}
      {renderContent()}
    </div>
  );
}
