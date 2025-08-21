import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { address, amount } = body;

  // Mock claim logic
  await new Promise(resolve => setTimeout(resolve, 1000));

  return NextResponse.json({
    success: true,
    txHash: "0x" + Math.random().toString(16).substr(2, 64),
    amount,
    address,
  });
}
