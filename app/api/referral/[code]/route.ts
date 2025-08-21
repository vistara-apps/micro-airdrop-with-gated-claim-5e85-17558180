import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    
    // Mock referral stats
    const stats = {
      code,
      totalReferrals: Math.floor(Math.random() * 50),
      totalEarned: Math.floor(Math.random() * 5000),
      pendingRewards: Math.floor(Math.random() * 500),
      recentReferrals: [
        {
          address: "0x" + Math.random().toString(16).substr(2, 8),
          timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
          reward: 50
        }
      ]
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch referral stats' },
      { status: 500 }
    );
  }
}
