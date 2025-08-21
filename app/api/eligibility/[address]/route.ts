import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;
    
    // Mock eligibility check logic
    const isEligible = Math.random() > 0.3; // 70% chance of eligibility
    const tokenAmount = isEligible ? Math.floor(Math.random() * 1000) + 100 : 0;
    const referralBonus = Math.floor(Math.random() * 50);
    
    const eligibility = {
      address,
      isEligible,
      tokenAmount,
      referralBonus,
      totalAmount: tokenAmount + referralBonus,
      criteria: [
        { name: "Wallet Age", met: true, description: "Account older than 30 days" },
        { name: "Transaction Count", met: isEligible, description: "Minimum 10 transactions" },
        { name: "Base Activity", met: true, description: "Active on Base network" },
      ]
    };

    return NextResponse.json(eligibility);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check eligibility' },
      { status: 500 }
    );
  }
}
