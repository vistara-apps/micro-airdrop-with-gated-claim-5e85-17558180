import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Mock airdrop statistics
  const mockStats = {
    totalClaimed: "12,450",
    totalUsers: "8,234",
    totalDistributed: "1,245,000",
    claimRate: "68",
    timeRemaining: "5d 12h 30m",
    recentActivity: [
      { user: "0x1234...5678", amount: "100", time: "2m ago" },
      { user: "0x9876...5432", amount: "150", time: "5m ago" },
      { user: "0x4567...8901", amount: "75", time: "8m ago" },
      { user: "0x2345...6789", amount: "200", time: "12m ago" },
    ]
  };

  return NextResponse.json(mockStats);
}
