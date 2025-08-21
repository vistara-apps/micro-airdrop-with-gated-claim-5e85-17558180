
"use client";

import { AirdropStats } from "../types";

interface StatsOverviewProps {
  stats: AirdropStats | null;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  if (!stats) {
    return (
      <div className="grid grid-cols-2 gap-md mb-xl">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="stat-card animate-pulse">
            <div className="h-4 bg-surface rounded mb-sm"></div>
            <div className="h-6 bg-surface rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const claimProgress = (stats.totalClaimed / stats.totalSupply) * 100;

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-2 gap-md mb-xl">
        <div className="stat-card">
          <div className="text-muted text-sm mb-xs">Total Supply</div>
          <div className="text-lg font-bold text-accent">
            {(stats.totalSupply / 1000000).toFixed(1)}M
          </div>
        </div>
        
        <div className="stat-card">
          <div className="text-muted text-sm mb-xs">Claimed</div>
          <div className="text-lg font-bold text-primary">
            {(stats.totalClaimed / 1000000).toFixed(1)}M
          </div>
        </div>
        
        <div className="stat-card">
          <div className="text-muted text-sm mb-xs">Users</div>
          <div className="text-lg font-bold text-success">
            {stats.totalUsers.toLocaleString()}
          </div>
        </div>
        
        <div className="stat-card">
          <div className="text-muted text-sm mb-xs">Referrals</div>
          <div className="text-lg font-bold text-warning">
            {stats.totalReferrals.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="card mb-xl">
        <div className="flex justify-between items-center mb-md">
          <span className="text-muted">Claim Progress</span>
          <span className="text-sm font-medium">{claimProgress.toFixed(1)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(claimProgress, 100)}%` }}
          ></div>
        </div>
        <div className="text-xs text-muted mt-sm">
          {(stats.totalSupply - stats.totalClaimed).toLocaleString()} tokens remaining
        </div>
      </div>
    </div>
  );
}
