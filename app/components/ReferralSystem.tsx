"use client";

import { useState } from "react";

export function ReferralSystem() {
  const [referralCode, setReferralCode] = useState("AIRDROP123");
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 5,
    bonusEarned: "50",
    pendingBonus: "25",
  });
  const [copied, setCopied] = useState(false);

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="card animate-slide-up">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <UsersIcon />
            <h3 className="text-lg font-semibold">Referral Program</h3>
          </div>
          
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <p className="text-sm text-accent font-medium mb-2">
              Earn 10% bonus tokens for each successful referral!
            </p>
            <p className="text-xs text-muted">
              Your friends get their full airdrop + you get bonus tokens
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              Your Referral Link
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={`${window.location.origin}?ref=${referralCode}`}
                readOnly
                className="input-field flex-1 text-sm"
              />
              <button
                onClick={copyReferralLink}
                className="btn-accent px-3 py-2 text-sm"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card animate-slide-up">
        <div className="space-y-4">
          <h4 className="font-semibold">Your Referral Stats</h4>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{referralStats.totalReferrals}</p>
              <p className="text-xs text-muted">Referrals</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{referralStats.bonusEarned}</p>
              <p className="text-xs text-muted">Bonus Earned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{referralStats.pendingBonus}</p>
              <p className="text-xs text-muted">Pending</p>
            </div>
          </div>
          
          {parseInt(referralStats.pendingBonus) > 0 && (
            <button className="btn-primary w-full">
              Claim Pending Bonus
            </button>
          )}
        </div>
      </div>

      <div className="card animate-slide-up">
        <div className="space-y-3">
          <h4 className="font-semibold">How It Works</h4>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                1
              </div>
              <div>
                <p className="text-sm font-medium">Share Your Link</p>
                <p className="text-xs text-muted">Send your referral link to friends</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                2
              </div>
              <div>
                <p className="text-sm font-medium">Friend Claims</p>
                <p className="text-xs text-muted">They use your link and claim their airdrop</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                3
              </div>
              <div>
                <p className="text-sm font-medium">Earn Bonus</p>
                <p className="text-xs text-muted">Get 10% of their claim as bonus tokens</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersIcon() {
  return (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  );
}
