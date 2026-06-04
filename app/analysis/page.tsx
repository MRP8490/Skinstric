import Link from "next/link";

export default function AnalysisPage() {
  return (
    <main className="relative min-h-screen bg-white text-black">
      <header className="absolute left-8 right-8 top-6 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm font-bold">
          <span>SKINSTRIC</span>
          <span className="text-gray-400">[ INTRO ]</span>
        </div>

        <button className="bg-black px-5 py-3 text-xs font-bold text-white">
          ENTER CODE
        </button>
      </header>

      <section className="absolute left-8 top-20">
        <h1 className="mb-4 text-xl font-bold">A.I. ANALYSIS</h1>
        <p className="mb-2 text-lg">A.I. HAS ESTIMATED THE FOLLOWING.</p>
        <p className="text-lg">FIX ESTIMATED INFORMATION IF NEEDED.</p>
      </section>

      <section className="flex min-h-screen items-center justify-center">
        <div className="relative mt-24 h-[500px] w-[500px]">
          <Link
            href="/demographics"
            className="absolute left-1/2 top-0 flex h-[220px] w-[220px] -translate-x-1/2 rotate-45 items-center justify-center border-[6px] border-white bg-gray-200 transition-all duration-300 hover:bg-gray-300 hover:scale-105"
          >
            <span className="-rotate-45 text-center text-lg font-bold">
              DEMOGRAPHICS
            </span>
          </Link>

          <Link
            href="/cosmetic-concerns"
            className="absolute left-0 top-1/2 flex h-[220px] w-[220px] -translate-y-1/2 rotate-45 items-center justify-center border-[6px] border-white bg-gray-100 transition-all duration-300 hover:bg-gray-200 hover:scale-105"
          >
            <span className="-rotate-45 text-center text-lg font-bold">
              COSMETIC
              <br />
              CONCERNS
            </span>
          </Link>

          <Link
            href="/skin-type-details"
            className="absolute right-0 top-1/2 flex h-[220px] w-[220px] -translate-y-1/2 rotate-45 items-center justify-center border-[6px] border-white bg-gray-100 transition-all duration-300 hover:bg-gray-200 hover:scale-105"
          >
            <span className="-rotate-45 text-center text-lg font-bold">
              SKIN TYPE DETAILS
            </span>
          </Link>

          <Link
            href="/weather"
            className="absolute bottom-0 left-1/2 flex h-[220px] w-[220px] -translate-x-1/2 rotate-45 items-center justify-center border-[6px] border-white bg-gray-100 transition-all duration-300 hover:bg-gray-200 hover:scale-105"
          >
            <span className="-rotate-45 text-center text-lg font-bold">
              WEATHER
            </span>
          </Link>
        </div>
      </section>

      <Link
        href="/upload"
        className="absolute bottom-10 left-8 flex items-center gap-4 font-bold"
      >
        <span className="flex h-14 w-14 rotate-45 items-center justify-center border border-black">
          <span className="-rotate-45">◀</span>
        </span>
        BACK
      </Link>

      <Link
        href="/demographics"
        className="absolute bottom-10 right-8 flex items-center gap-4 font-bold"
      >
        GET SUMMARY
        <span className="flex h-14 w-14 rotate-45 items-center justify-center border border-black">
          <span className="-rotate-45">▶</span>
        </span>
      </Link>
    </main>
  );
}