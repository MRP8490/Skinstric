"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LocationPage() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit() {
    const cleanedLocation = location.trim();

    if (!cleanedLocation) {
      setError("Please enter your city name");
      return;
    }

    const validLocation = /^[a-zA-Z\s'-]+$/;

    if (!validLocation.test(cleanedLocation)) {
      setError(
        "Please enter a valid city without numbers or special characters"
      );
      return;
    }

    const name = localStorage.getItem("skinstric-name") || "";

    const response = await fetch("/api/phase-one", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        location: cleanedLocation,
      }),
    });

    const data = await response.json();

    localStorage.setItem("skinstric-phase-one", JSON.stringify(data));
    localStorage.setItem("skinstric-location", cleanedLocation);

    setError("");
    router.push("/thank-you");
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
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
              setError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSubmit();
            }}
            placeholder="your city name"
            maxLength={40}
            autoFocus
            className="w-[600px] border-b border-black bg-transparent text-center text-6xl text-gray-500 outline-none"
          />
        </div>
      </div>
      <button
  type="button"
  onClick={() => router.push("/intro")}
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