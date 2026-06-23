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
    <main className="min-h-screen overflow-hidden bg-white text-black">
      <div className="px-4 pt-5 md:p-8">
        <p className="mb-4 text-[8px] font-bold md:mb-5 md:text-sm">
          SKINSTRIC [ ANALYSIS ]
        </p>

        <h1 className="text-[42px] font-light leading-none tracking-tight md:text-[96px]">
          DEMOGRAPHICS
        </h1>

        <p className="mt-2 text-[10px] tracking-wide md:mt-4 md:text-lg">
          PREDICTED RACE & AGE
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 px-4 pb-8 md:mt-8 md:flex-row md:px-6">
        <div className="grid grid-cols-3 gap-2 md:block md:w-[165px] md:shrink-0">
          <div className="bg-black px-3 py-4 text-white md:mb-2 md:px-5 md:py-6">
            <p className="text-sm font-semibold capitalize md:text-3xl">
              {race}
            </p>
            <p className="mt-1 text-[8px] tracking-[0.2em] md:text-xs">
              RACE
            </p>
          </div>

          <div className="border border-black px-3 py-4 md:mb-2 md:px-5 md:py-6">
            <p className="text-sm font-semibold md:text-3xl">{age}</p>
            <p className="mt-1 text-[8px] tracking-[0.2em] md:text-xs">
              AGE
            </p>
          </div>

          <div className="border border-black px-3 py-4 md:px-5 md:py-6">
            <p className="text-sm font-semibold uppercase md:text-3xl">
              {gender}
            </p>
            <p className="mt-1 text-[8px] tracking-[0.2em] md:text-xs">
              SEX
            </p>
          </div>
        </div>

        <div className="flex h-[220px] items-center justify-center border border-black bg-[#f7f7f7] md:h-[560px] md:flex-1">
          <div className="text-center">
            <div className="mb-2 text-[54px] font-light leading-none md:mb-4 md:text-[150px]">
              {confidence}%
            </div>

            <p className="text-lg font-light capitalize tracking-wide md:text-4xl">
              {race}
            </p>
          </div>
        </div>

        <div className="w-full border border-black md:w-[420px]">
          <div className="flex justify-between border-b border-black p-3 font-semibold md:p-4">
            <span className="text-[8px] tracking-[0.2em] md:text-xs">
              RACE
            </span>
            <span className="text-[8px] tracking-[0.2em] md:text-xs">
              A.I. CONFIDENCE
            </span>
          </div>

          {raceList.map(([name, score]) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                setRace(name);
                setConfidence((Number(score) * 100).toFixed(2));
              }}
              className={`flex w-full justify-between px-3 py-3 text-left text-[11px] transition md:px-4 md:py-5 md:text-base ${
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