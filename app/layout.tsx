import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  return {
    title: "Micro Airdrop System",
    description: "Claim your tokens with referral bonuses and gated access",
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `${URL}/api/og`,
        button: {
          title: "Launch Micro Airdrop",
          action: {
            type: "launch_frame",
            name: "Micro Airdrop System",
            url: URL,
            splashImageUrl: `${URL}/splash.png`,
            splashBackgroundColor: "#0f0f23",
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
