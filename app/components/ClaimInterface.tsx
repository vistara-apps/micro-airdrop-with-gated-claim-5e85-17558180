"use client";

import { useState } from "react";

interface ClaimInterfaceProps {
  eligibility: any;
  onClaimStatusChange: (status: string) => void;
}

export function ClaimInterface({ eligibility, onClaimStatusChange }: ClaimInterfaceProps) {
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const handleClaim = async () => {
    setIsClaiming(true);
    
    // Simulate claim transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setClaimed(true);
    setIsClaiming(false);
    onClaimStatusChange("claimed");
  };

  if (!eligibility.isEligible) {
    return (
      <div className="card animate-slide-up">
        <div className="text-center space-y-4">
          <XCircleIcon />
          <div>
            <h3 className="text-lg font-semibold text-error">Not Eligible</h3>
            <p className="text-muted text-sm mt-1">
              You don't meet the requirements for this airdrop
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Requirements:</p>
            <div className="space-y-1">
              {eligibility.criteria.map((criterion: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    index < eligibility.metCriteria ? "bg-success" : "bg-error"
                  }`} />
                  <span className={index < eligibility.metCriteria ? "text-success" : "text-error"}>
                    {criterion}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (claimed) {
    return (
      <div className="card animate-slide-up">
        <div className="text-center space-y-4">
          <CheckCircleIcon />
          <div>
            <h3 className="text-lg font-semibold text-success">Claimed Successfully!</h3>
            <p className="text-muted text-sm mt-1">
              {eligibility.amount} tokens have been sent to your wallet
            </p>
          </div>
          
          <div className="bg-success/10 border border-success/20 rounded-lg p-3">
            <p className="text-success text-sm font-medium">
              Share your referral link to earn bonus tokens!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card animate-slide-up">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <GiftIcon />
          <h3 className="text-lg font-semibold text-success">Eligible to Claim!</h3>
        </div>
        
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="text-center space-y-2">
            <p className="text-2xl font-bold text-success">{eligibility.amount} TOKENS</p>
            <p className="text-sm text-muted">Available to claim</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Requirements Met:</p>
          <div className="space-y-1">
            {eligibility.criteria.map((criterion: string, index: number) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <CheckIcon />
                <span className="text-success">{criterion}</span>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={handleClaim}
          disabled={isClaiming}
          className="btn-success w-full disabled:opacity-50 disabled:cursor-not-allowed shadow-glow"
        >
          {isClaiming ? (
            <div className="flex items-center justify-center space-x-2">
              <LoadingSpinner />
              <span>Claiming...</span>
            </div>
          ) : (
            "Claim Tokens"
          )}
        </button>
      </div>
    </div>
  );
}

function XCircleIcon() {
  return (
    <svg className="w-12 h-12 text-error mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-12 h-12 text-success mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}
