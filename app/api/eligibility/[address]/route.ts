import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;
  
  // Mock eligibility check logic
  const mockEligibility = {
    isEligible: Math.random() > 0.3,
    amount: "100",
    criteria: ["Hold 0.1 ETH", "Active on Base", "First time claimer"],
    metCriteria: Math.floor(Math.random() * 3) + 1,
    totalCriteria: 3,
    address,
  };

  return NextResponse.json(mockEligibility);
}
