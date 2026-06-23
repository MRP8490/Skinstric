"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function IntroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    const cleanedName = name.trim();

    if (!cleanedName) {
      setError("Please enter your name");
      return;
    }

    const validName = /^[a-zA-Z\s'-]+$/;

    if (!validName.test(cleanedName)) {
      setError("Please enter a valid name without numbers or special characters");
      return;
    }

    setError("");
    localStorage.setItem("skinstric-name", cleanedName);
    router.push("/location");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <header className="absolute left-4 right-4 top-5 z-20 flex items-center justify-between text-[8px] font-bold md:left-8 md:right-8 md:top-8 md:text-sm">
        <p>
          SKINSTRIC <span className="text-gray-400">[ INTRO ]</span>
        </p>

        <button className="bg-black px-3 py-2 text-[7px] text-white md:px-5 md:py-3 md:text-xs">
          ENTER CODE
        </button>
      </header>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] animate-very-slow-spin md:h-[520px] md:w-[520px]">
        <div className="absolute inset-0 rotate-[8deg] border border-dotted border-gray-400 opacity-30 md:opacity-50" />
        <div className="absolute inset-0 rotate-[22deg] border border-dotted border-gray-400 opacity-30 md:opacity-50" />
        <div className="absolute inset-0 rotate-[36deg] border border-dotted border-gray-400 opacity-30 md:opacity-50" />
        <div className="absolute inset-0 rotate-[50deg] border border-dotted border-gray-400 opacity-30 md:opacity-50" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <p className="mb-2 text-[9px] text-gray-400 md:mb-4 md:text-sm">
            CLICK TO TYPE
          </p>

          {error && (
            <p className="mb-2 text-[10px] font-medium text-red-500 md:mb-4 md:text-sm">
              {error}
            </p>
          )}

          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSubmit();
            }}
            placeholder="Introduce Yourself"
            maxLength={30}
            autoFocus
            className="w-[270px] border-b border-black bg-transparent text-center text-[30px] text-gray-400 outline-none md:w-[600px] md:text-6xl"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push("/")}
        className="absolute bottom-8 left-8 z-20 flex items-center gap-3 text-[9px] font-bold md:bottom-10 md:left-8 md:gap-4 md:text-base"
      >
        <span className="flex h-10 w-10 rotate-45 items-center justify-center border border-black md:h-16 md:w-16">
          <span className="-rotate-45">◀</span>
        </span>
        BACK
      </button>
    </main>
  );
}