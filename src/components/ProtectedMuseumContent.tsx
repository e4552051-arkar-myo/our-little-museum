"use client";

import { useState } from "react";
import { isUnlocked } from "@/lib/passcode";
import { PasscodeGate } from "@/components/PasscodeGate";

type ProtectedMuseumContentProps = {
  children: React.ReactNode;
};

export function ProtectedMuseumContent({ children }: ProtectedMuseumContentProps) {
  const [unlocked, setUnlocked] = useState(() => isUnlocked());

  if (!unlocked) {
    return <PasscodeGate onUnlocked={() => setUnlocked(true)} />;
  }

  return <>{children}</>;
}
