"use client";

import { useEffect, useState } from "react";

type ScoreItem = [string, number];
type Category = "race" | "age" | "gender";

export default function DemographicsPage() {
  const [active, setActive] = useState<Category>("race");

  const [race, setRace] = useState("Loading...");
  const [age, setAge] = useState("Loading...");
  const [gender, setGender] = useState("Loading...");
  const [confidence, setConfidence] = useState("0.00");

  const [raceList, setRaceList] = useState<ScoreItem[]>([]);
  const [ageList, setAgeList] = useState<ScoreItem[]>([]);
  const [genderList, setGenderList] = useState<ScoreItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("skinstric-analysis");
    if (!saved) return;

    const parsed = JSON.parse(saved);

    const sortedRace = Object.entries(parsed.data.race).sort(
      (a, b) => Number(b[1]) - Number(a[1])
    ) as ScoreItem[];

    const sortedAge = Object.entries(parsed.data.age).sort(
      (a, b) => Number(b[1]) - Number(a[1])
    ) as ScoreItem[];

    const sortedGender = Object.entries(parsed.data.gender).sort(
      (a, b) => Number(b[1]) - Number(a[1])
    ) as ScoreItem[];

    setRaceList(sortedRace);
    setAgeList(sortedAge);
    setGenderList(sortedGender);

    setRace(sortedRace[0][0]);
    setAge(sortedAge[0][0]);
    setGender(sortedGender[0][0]);
    setConfidence((sortedRace[0][1] * 100).toFixed(2));
  }, []);

  const list = active === "race" ? raceList : active === "age" ? ageList : genderList;
  const value = active === "race" ? race : active === "age" ? age : gender;
  const title = active === "gender" ? "SEX" : active.toUpperCase();

  function selectCategory(category: Category) {
    setActive(category);

    const newList =
      category === "race" ? raceList : category === "age" ? ageList : genderList;

    if (newList[0]) {
      setConfidence((newList[0][1] * 100).toFixed(2));
    }
  }

  function selectValue(name: string, score: number) {
    if (active === "race") setRace(name);
    if (active === "age") setAge(name);
    if (active === "gender") setGender(name);

    setConfidence((score * 100).toFixed(2));
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white text-black">
      <div className="px-4 pt-5 md:px-8 md:pt-6">
        <p className="mb-4 text-[9px] font-bold md:text-sm">
          SKINSTRIC [ ANALYSIS ]
        </p>

        <h1 className="text-[42px] font-light leading-none tracking-[-0.06em] md:text-[96px]">
          DEMOGRAPHICS
        </h1>

        <p className="mt-3 text-[10px] md:text-lg">PREDICTED RACE & AGE</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 px-4 pb-24 md:mt-20 md:flex-row md:px-6">
        <div className="grid grid-cols-3 gap-2 md:block md:w-[220px]">
          <button
            onClick={() => selectCategory("race")}
            className={`w-full border border-black p-3 text-left md:mb-3 md:p-6 ${
              active === "race" ? "bg-black text-white" : "bg-white"
            }`}
          >
            <p className="text-sm font-bold capitalize md:text-2xl">{race}</p>
            <p className="mt-2 text-[8px] tracking-widest md:text-xs">RACE</p>
          </button>

          <button
            onClick={() => selectCategory("age")}
            className={`w-full border border-black p-3 text-left md:mb-3 md:p-6 ${
              active === "age" ? "bg-black text-white" : "bg-white"
            }`}
          >
            <p className="text-sm font-bold md:text-2xl">{age}</p>
            <p className="mt-2 text-[8px] tracking-widest md:text-xs">AGE</p>
          </button>

          <button
            onClick={() => selectCategory("gender")}
            className={`w-full border border-black p-3 text-left md:p-6 ${
              active === "gender" ? "bg-black text-white" : "bg-white"
            }`}
          >
            <p className="text-sm font-bold uppercase md:text-2xl">{gender}</p>
            <p className="mt-2 text-[8px] tracking-widest md:text-xs">SEX</p>
          </button>
        </div>

        <div className="flex h-[240px] flex-1 items-center justify-center border border-black bg-[#f7f7f7] md:h-[560px]">
          <div className="text-center">
            <p className="text-[64px] font-light leading-none md:text-[140px]">
              {confidence}%
            </p>
            <p className="mt-3 text-xl capitalize md:text-4xl">{value}</p>
          </div>
        </div>

        <div className="w-full border border-black md:w-[420px]">
          <div className="flex justify-between border-b border-black p-4 font-bold">
            <span className="text-[9px] tracking-widest md:text-xs">{title}</span>
            <span className="text-[9px] tracking-widest md:text-xs">
              A.I. CONFIDENCE
            </span>
          </div>

          {list.map(([name, score]) => {
            const selected =
              active === "race"
                ? race === name
                : active === "age"
                ? age === name
                : gender === name;

            return (
              <button
                key={name}
                onClick={() => selectValue(name, score)}
                className={`flex w-full justify-between px-4 py-4 text-left text-sm md:py-5 md:text-base ${
                  selected ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                }`}
              >
                <span className="capitalize">{name}</span>
                <span>{(score * 100).toFixed(2)}%</span>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}