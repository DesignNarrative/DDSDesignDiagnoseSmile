"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    // Send 404 hit log details to our API
    if (typeof window !== "undefined") {
      fetch("/api/seo/404", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: window.location.pathname,
          referrer: document.referrer || "Direct Link / Bookmark",
        }),
      }).catch(() => {
        // Fail silently
      });
    }
  }, []);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-cream-light/10 px-6 py-12 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-md border border-border-neutral flex flex-col items-center space-y-6">
        <div className="bg-red-50 p-4 rounded-full">
          <AlertTriangle className="w-12 h-12 text-red-500 animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h1 className="font-caudex font-bold text-3xl text-primary">Page Not Found</h1>
          <p className="font-instrument text-sm text-text-muted">
            The page you are looking for does not exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 w-full">
          <Link
            href="/"
            className="w-full bg-[#380920] hover:bg-[#380920]/90 text-white font-instrument text-sm font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Home className="w-4 h-4" /> Go back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
