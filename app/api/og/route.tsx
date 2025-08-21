
import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

export async function GET(request: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a1b2e 0%, #16213e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            background: "linear-gradient(45deg, #c471ed 0%, #3b82f6 100%)",
            width: 120,
            height: 120,
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <span style={{ color: "white", fontSize: 48, fontWeight: "bold" }}>
            A
          </span>
        </div>
        <h1
          style={{
            color: "white",
            fontSize: 48,
            fontWeight: "bold",
            marginBottom: 16,
          }}
        >
          Micro Airdrop
        </h1>
        <p
          style={{
            color: "#9ca3af",
            fontSize: 24,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          Claim your tokens and earn referral bonuses
        </p>
        <div
          style={{
            background: "rgba(196, 113, 237, 0.2)",
            border: "1px solid rgba(196, 113, 237, 0.3)",
            borderRadius: 16,
            padding: "16px 32px",
            color: "#c471ed",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          🎁 Join the airdrop now!
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
