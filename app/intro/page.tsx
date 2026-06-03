
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
      setError(
        "Please enter a valid name without numbers or special characters"
      );
      return;
    }

    setError("");
    localStorage.setItem("skinstric-name", cleanedName);
    router.push("/location");
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="p-8">
        <p className="text-sm font-bold">SKINSTRIC [ INTRO ]</p>
      </div>

      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-sm text-gray-400">CLICK TO TYPE</p>

          {error && (
            <p className="mb-4 text-sm font-medium text-red-500">
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
            className="w-[600px] border-b border-black bg-transparent text-center text-6xl text-gray-500 outline-none"
          />
        </div>
      </div>
      <button
  type="button"
  onClick={() => router.push("/")}
  className="absolute bottom-10 left-8 flex items-center gap-4 font-bold"
>
  <span className="flex h-16 w-16 rotate-45 items-center justify-center border border-black">
    <span className="-rotate-45">◀</span>
  </span>
  BACK
</button>
    </main>
  );
}