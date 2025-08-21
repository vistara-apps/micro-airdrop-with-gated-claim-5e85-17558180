
export interface User {
  address: string;
  fid?: number;
  referralCode: string;
  referredBy?: string;
  totalClaimed: number;
  referralCount: number;
  referralEarnings: number;
  eligibleAmount: number;
  hasClaimed: boolean;
  lastClaimTime?: number;
}

export interface AirdropStats {
  totalSupply: number;
  totalClaimed: number;
  totalUsers: number;
  totalReferrals: number;
  claimableAmount: number;
}

export interface ReferralBonus {
  level: number;
  percentage: number;
  description: string;
}

export interface ClaimResult {
  success: boolean;
  amount: number;
  txHash?: string;
  error?: string;
}
