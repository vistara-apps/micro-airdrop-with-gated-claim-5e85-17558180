
'use client';

import { useState, useEffect } from 'react';

interface AirdropDashboardProps {
  onClaim: () => void;
  onReferral: () => void;
  onVerify: () => void;
  isVerified: boolean;
}

interface AirdropStats {
  totalTokens: string;
  claimedTokens: string;
  eligibleUsers: number;
  yourAllocation: string;
  referralBonus: string;
  timeRemaining: string;
}

export function AirdropDashboard({ onClaim, onReferral, onVerify, isVerified }: AirdropDashboardProps) {
  const [stats, setStats] = useState<AirdropStats>({
    totalTokens: '1,000,000',
    claimedTokens: '342,567',
    eligibleUsers: 8421,
    yourAllocation: '150',
    referralBonus: '45',
    timeRemaining: '3d 14h 27m'
  });

  const [hasClaimed, setHasClaimed] = useState(false);
  const [referralCount, setReferralCount] = useState(7);

  const progressPercentage = (parseFloat(stats.claimedTokens.replace(/,/g, '')) / parseFloat(stats.totalTokens.replace(/,/g, ''))) * 100;

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        claimedTokens: (parseFloat(prev.claimedTokens.replace(/,/g, '')) + Math.floor(Math.random() * 100)).toLocaleString(),
        eligibleUsers: prev.eligibleUsers + Math.floor(Math.random() * 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-xl animate-slide-up">
      {/* Header */}
      <div className="text-center space-y-md">
        <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-xl mx-auto flex items-center justify-center text-2xl shadow-glow animate-pulse-glow">
          🚀
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
          Micro Airdrop
        </h1>
        <p className="text-muted text-sm">
          Claim your allocation before time runs out
        </p>
      </div>

      {/* Progress Bar */}
      <div className="card space-y-md">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Distribution Progress</span>
          <span className="text-sm text-muted">{progressPercentage.toFixed(1)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted">
          <span>{stats.claimedTokens} claimed</span>
          <span>{stats.totalTokens} total</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-md">
        <div className="stat-card">
          <div className="text-lg font-bold text-accent">{stats.yourAllocation}</div>
          <div className="text-xs text-muted">Your Allocation</div>
        </div>
        <div className="stat-card">
          <div className="text-lg font-bold text-primary">{stats.referralBonus}</div>
          <div className="text-xs text-muted">Referral Bonus</div>
        </div>
        <div className="stat-card">
          <div className="text-lg font-bold text-warning">{stats.timeRemaining}</div>
          <div className="text-xs text-muted">Time Remaining</div>
        </div>
        <div className="stat-card">
          <div className="text-lg font-bold text-text">{referralCount}</div>
          <div className="text-xs text-muted">Referrals</div>
        </div>
      </div>

      {/* Verification Status */}
      {!isVerified && (
        <div className="card bg-warning/10 border-warning/20">
          <div className="flex items-center space-x-md">
            <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
              ⚠️
            </div>
            <div className="flex-1">
              <div className="font-medium text-warning">Verification Required</div>
              <div className="text-xs text-muted">Complete verification to unlock your allocation</div>
            </div>
            <button
              onClick={onVerify}
              className="btn-primary text-sm px-md py-xs"
            >
              Verify
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-md">
        <button
          onClick={onClaim}
          disabled={!isVerified || hasClaimed}
          className={`w-full ${
            hasClaimed 
              ? 'bg-success/20 text-success cursor-not-allowed' 
              : 'btn-accent'
          } text-lg font-semibold py-lg`}
        >
          {hasClaimed ? '✓ Claimed Successfully' : 'Claim Tokens'}
        </button>

        <div className="grid grid-cols-2 gap-md">
          <button
            onClick={onReferral}
            className="btn-ghost text-center"
          >
            <div className="text-sm font-medium">Share & Earn</div>
            <div className="text-xs text-muted">+30% bonus</div>
          </button>
          <button
            onClick={() => window.open('https://basescan.org', '_blank')}
            className="btn-ghost text-center"
          >
            <div className="text-sm font-medium">View Contract</div>
            <div className="text-xs text-muted">BaseScan</div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="font-semibold mb-md">Recent Claims</h3>
        <div className="space-y-sm">
          {[
            { address: '0x742d...35Cc', amount: '120', time: '2m ago' },
            { address: '0x891c...92Ef', amount: '85', time: '5m ago' },
            { address: '0x123a...78Bd', amount: '200', time: '8m ago' },
          ].map((claim, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="text-muted">{claim.address}</span>
              <div className="text-right">
                <div className="text-accent font-medium">{claim.amount} tokens</div>
                <div className="text-xs text-muted">{claim.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
