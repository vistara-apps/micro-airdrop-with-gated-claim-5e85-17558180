import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { address, amount } = await request.json();
    
    // Mock claim transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const txHash = "0x" + Math.random().toString(16).substr(2, 64);
    
    return NextResponse.json({
      success: true,
      txHash,
      amount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process claim' },
      { status: 500 }
    );
  }
}
