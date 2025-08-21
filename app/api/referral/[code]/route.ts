import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  
  // Mock referral stats
  const mockStats = {
    code,
    totalReferrals: Math.floor(Math.random() * 20),
    bonusEarned: (Math.random() * 100).toFixed(0),
    pendingBonus: (Math.random() * 50).toFixed(0),
  };

  return NextResponse.json(mockStats);
}
