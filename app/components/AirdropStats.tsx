"use client";

import { useState, useEffect } from "react";

export function AirdropStats() {
  const [stats, setStats] = useState({
    totalClaimed: "12,450",
    totalUsers: "8,234",
    totalDistributed: "1,245,000",
    claimRate: "68",
    timeRemaining: "5d 12h 30m",
  });

  return (
    <div className="space-y-4">
      <div className="card animate-slide-up">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <ChartBarIcon />
            <h3 className="text-lg font-semibold">Airdrop Statistics</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
              <p className="text-2xl font-bold text-primary">{stats.totalClaimed}</p>
              <p className="text-xs text-muted">Total Claims</p>
            </div>
            
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
              <p className="text-2xl font-bold text-accent">{stats.totalUsers}</p>
              <p className="text-xs text-muted">Unique Users</p>
            </div>
            
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <p className="text-2xl font-bold text-success">{stats.totalDistributed}</p>
              <p className="text-xs text-muted">Tokens Distributed</p>
            </div>
            
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <p className="text-2xl font-bold text-warning">{stats.claimRate}%</p>
              <p className="text-xs text-muted">Claim Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card animate-slide-up">
        <div className="space-y-4">
          <h4 className="font-semibold">Time Remaining</h4>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-error">{stats.timeRemaining}</p>
            <p className="text-sm text-muted">Until airdrop ends</p>
          </div>
          
          <div className="bg-error/10 border border-error/20 rounded-lg p-3">
            <p className="text-error text-sm font-medium text-center">
              ⏰ Don't miss out! Claim your tokens before time runs out
            </p>
          </div>
        </div>
      </div>

      <div className="card animate-slide-up">
        <div className="space-y-4">
          <h4 className="font-semibold">Recent Activity</h4>
          
          <div className="space-y-3">
            {[
              { user: "0x1234...5678", amount: "100", time: "2m ago" },
              { user: "0x9876...5432", amount: "150", time: "5m ago" },
              { user: "0x4567...8901", amount: "75", time: "8m ago" },
              { user: "0x2345...6789", amount: "200", time: "12m ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="font-mono text-muted">{activity.user}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-success">+{activity.amount}</p>
                  <p className="text-xs text-muted">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartBarIcon() {
  return (
    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}
