"use client";

import { Navbar } from "@/components/ui/navbar";
import { GlobalCountdown } from "@/components/GlobalCountdown";

export function SiteHeader() {
  return (
    <>
      <Navbar />
      <div className="pt-16"> {/* This adds padding equal to navbar height */}
        <GlobalCountdown />
      </div>
    </>
  );
}
