"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useState, useCallback } from "react";
import { EligibilityChecker } from "./components/EligibilityChecker";
import { ClaimInterface } from "./components/ClaimInterface";
import { ReferralSystem } from "./components/ReferralSystem";
import { AirdropStats } from "./components/AirdropStats";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("claim");
  const [userEligibility, setUserEligibility] = useState(null);
  const [claimStatus, setClaimStatus] = useState("unclaimed");

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = () => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="flex items-center space-x-1 text-accent hover:text-accent/80 transition-colors"
        >
          <PlusIcon />
          <span className="text-sm">Save</span>
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-success animate-fade-in">
          <CheckIcon />
          <span className="text-sm">Saved</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-text bg-bg">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-6 h-11">
          <div>
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
          <div>{saveFrameButton()}</div>
        </header>

        <main className="flex-1 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-text">Micro Airdrop</h1>
            <p className="text-muted">Claim your tokens and earn referral bonuses</p>
          </div>

          <div className="flex space-x-1 bg-surface rounded-lg p-1">
            <button
              onClick={() => setActiveTab("claim")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "claim"
                  ? "bg-primary text-white"
                  : "text-muted hover:text-text"
              }`}
            >
              Claim
            </button>
            <button
              onClick={() => setActiveTab("referral")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "referral"
                  ? "bg-primary text-white"
                  : "text-muted hover:text-text"
              }`}
            >
              Referral
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === "stats"
                  ? "bg-primary text-white"
                  : "text-muted hover:text-text"
              }`}
            >
              Stats
            </button>
          </div>

          {activeTab === "claim" && (
            <div className="space-y-4">
              <EligibilityChecker 
                onEligibilityCheck={setUserEligibility}
              />
              {userEligibility && (
                <ClaimInterface 
                  eligibility={userEligibility}
                  onClaimStatusChange={setClaimStatus}
                />
              )}
            </div>
          )}

          {activeTab === "referral" && (
            <ReferralSystem />
          )}

          {activeTab === "stats" && (
            <AirdropStats />
          )}
        </main>

        <footer className="mt-6 pt-4 flex justify-center">
          <button
            className="text-muted text-xs hover:text-text transition-colors"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </button>
        </footer>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
