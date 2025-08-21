
"use client";

import { useState, useEffect } from "react";
import { User, AirdropStats, ClaimResult } from "../types";

export function useAirdrop(address?: string) {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<AirdropStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    if (address) {
      loadUserData(address);
    }
    loadStats();
  }, [address]);

  const loadUserData = async (userAddress: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/${userAddress}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch("/api/stats");
      if (response.ok) {
        const statsData = await response.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  const checkEligibility = async (userAddress: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/eligibility/${userAddress}`);
      const { eligible } = await response.json();
      return eligible;
    } catch (error) {
      console.error("Failed to check eligibility:", error);
      return false;
    }
  };

  const claimAirdrop = async (userAddress: string, referralCode?: string): Promise<ClaimResult> => {
    try {
      setClaiming(true);
      const response = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: userAddress, referralCode }),
      });

      const result = await response.json();
      
      if (result.success) {
        await loadUserData(userAddress);
        await loadStats();
      }
      
      return result;
    } catch (error) {
      console.error("Failed to claim airdrop:", error);
      return { success: false, amount: 0, error: "Network error" };
    } finally {
      setClaiming(false);
    }
  };

  const generateReferralLink = (referralCode: string): string => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}?ref=${referralCode}`;
  };

  return {
    user,
    stats,
    loading,
    claiming,
    checkEligibility,
    claimAirdrop,
    generateReferralLink,
    refreshData: () => address && loadUserData(address),
  };
}
