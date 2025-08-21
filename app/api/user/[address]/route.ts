
import { NextRequest, NextResponse } from "next/server";

// Mock user data - replace with actual database in production
const users = new Map();

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  const address = params.address.toLowerCase();
  
  // Generate or retrieve user data
  if (!users.has(address)) {
    const referralCode = generateReferralCode();
    users.set(address, {
      address,
      referralCode,
      totalClaimed: 0,
      referralCount: 0,
      referralEarnings: 0,
      eligibleAmount: 1000,
      hasClaimed: false,
    });
  }

  return NextResponse.json(users.get(address));
}

function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
