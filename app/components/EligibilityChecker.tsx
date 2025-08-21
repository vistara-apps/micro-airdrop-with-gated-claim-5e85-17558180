"use client";

import { useState } from "react";
import { Address } from "@coinbase/onchainkit/identity";

interface EligibilityCheckerProps {
  onEligibilityCheck: (eligibility: any) => void;
}

export function EligibilityChecker({ onEligibilityCheck }: EligibilityCheckerProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [address, setAddress] = useState("");

  const checkEligibility = async () => {
    if (!address) return;
    
    setIsChecking(true);
    
    // Simulate eligibility check
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockEligibility = {
      isEligible: Math.random() > 0.3,
      amount: "100",
      criteria: ["Hold 0.1 ETH", "Active on Base", "First time claimer"],
      metCriteria: Math.floor(Math.random() * 3) + 1,
      totalCriteria: 3,
    };
    
    onEligibilityCheck(mockEligibility);
    setIsChecking(false);
  };

  return (
    <div className="card animate-slide-up">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <ShieldCheckIcon />
          <h3 className="text-lg font-semibold">Check Eligibility</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-muted mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              className="input-field w-full"
            />
          </div>
          
          <button
            onClick={checkEligibility}
            disabled={!address || isChecking}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isChecking ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner />
                <span>Checking...</span>
              </div>
            ) : (
              "Check Eligibility"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function ShieldCheckIcon() {
  return (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
