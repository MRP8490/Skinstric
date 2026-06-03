"use client";

import { useEffect } from "react";

export default function LoadingPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/analysis";
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="mb-6 text-4xl font-semibold">
          PREPARING YOUR ANALYSIS...
        </h1>

        <div className="text-4xl">• • •</div>
      </div>
    </main>
  );
}