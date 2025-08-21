import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock airdrop statistics
    const stats = {
      totalClaimed: Math.floor(Math.random() * 10000) + 5000,
      totalUsers: Math.floor(Math.random() * 1000) + 500,
      totalDistributed: Math.floor(Math.random() * 1000000) + 500000,
      claimRate: Math.floor(Math.random() * 30) + 60,
      timeRemaining: "5 days 12 hours",
      recentActivity: Array.from({ length: 5 }, () => ({
        address: "0x" + Math.random().toString(16).substr(2, 8),
        amount: Math.floor(Math.random() * 500) + 100,
        timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString()
      }))
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
