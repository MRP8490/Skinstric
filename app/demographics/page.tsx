"use client";

import { useEffect, useState } from "react";

type ScoreItem = [string, number];

export default function DemographicsPage() {
  const [race, setRace] = useState("Loading...");
  const [age, setAge] = useState("Loading...");
  const [gender, setGender] = useState("Loading...");
  const [confidence, setConfidence] = useState("0.00");
  const [raceList, setRaceList] = useState<ScoreItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("skinstric-analysis");
    if (!saved) return;

    const parsed = JSON.parse(saved);

    const raceData = parsed.data.race;
    const ageData = parsed.data.age;
    const genderData = parsed.data.gender;

    const sortedRace = Object.entries(raceData).sort(
      (a, b) => Number(b[1]) - Number(a[1])
    ) as ScoreItem[];

    const sortedAge = Object.entries(ageData).sort(
      (a, b) => Number(b[1]) - Number(a[1])
    ) as ScoreItem[];

    const sortedGender = Object.entries(genderData).sort(
      (a, b) => Number(b[1]) - Number(a[1])
    ) as ScoreItem[];

    setRace(sortedRace[0][0]);
    setAge(sortedAge[0][0]);
    setGender(sortedGender[0][0]);
    setConfidence((sortedRace[0][1] * 100).toFixed(2));
    setRaceList(sortedRace);
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="p-8">
        <p className="mb-5 text-sm font-bold">SKINSTRIC [ ANALYSIS ]</p>

        <h1 className="text-[96px] font-light leading-none tracking-tight">
          DEMOGRAPHICS
        </h1>

        <p className="mt-4 text-lg tracking-wide">PREDICTED RACE & AGE</p>
      </div>

      <div className="mt-8 flex gap-3 px-6">
        <div className="w-[165px] shrink-0">
          <div className="mb-2 bg-black px-5 py-6 text-white">
            <p className="text-3xl font-semibold capitalize">{race}</p>
            <p className="mt-1 text-xs tracking-[0.2em]">RACE</p>
          </div>

          <div className="mb-2 border border-black px-5 py-6">
            <p className="text-3xl font-semibold">{age}</p>
            <p className="mt-1 text-xs tracking-[0.2em]">AGE</p>
          </div>

          <div className="border border-black px-5 py-6">
            <p className="text-3xl font-semibold uppercase">{gender}</p>
            <p className="mt-1 text-xs tracking-[0.2em]">SEX</p>
          </div>
        </div>

        <div className="flex h-[560px] flex-1 items-center justify-center border border-black bg-[#f7f7f7]">
          <div className="text-center">
            <div className="mb-4 text-[150px] font-light leading-none">
              {confidence}%
            </div>

            <p className="text-4xl font-light capitalize tracking-wide">
              {race}
            </p>
          </div>
        </div>

        <div className="w-[420px] border border-black">
          <div className="flex justify-between border-b border-black p-4 font-semibold">
            <span className="text-xs tracking-[0.2em]">RACE</span>
            <span className="text-xs tracking-[0.2em]">A.I. CONFIDENCE</span>
          </div>

          {raceList.map(([name, score], index) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                setRace(name);
                setConfidence((Number(score) * 100).toFixed(2));
              }}
              className={`flex w-full justify-between px-4 py-5 text-left transition ${
                race === name
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <span className="capitalize">{name}</span>
              <span>{(Number(score) * 100).toFixed(2)}%</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}