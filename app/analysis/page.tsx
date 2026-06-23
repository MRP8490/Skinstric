import Link from "next/link";

export default function AnalysisPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <header className="absolute left-4 right-4 top-5 z-20 flex items-center justify-between text-[8px] font-bold md:left-8 md:right-8 md:top-6 md:text-sm">
        <div className="flex items-center gap-2 md:gap-4">
          <span>SKINSTRIC</span>
          <span className="text-gray-400">[ INTRO ]</span>
        </div>

        <button
          type="button"
          className="bg-black px-3 py-2 text-[7px] text-white md:px-5 md:py-3 md:text-xs"
        >
          ENTER CODE
        </button>
      </header>

      <section className="absolute left-4 top-16 z-20 md:left-8 md:top-20">
        <h1 className="mb-2 text-sm font-bold md:mb-4 md:text-xl">
          A.I. ANALYSIS
        </h1>

        <p className="mb-1 max-w-[170px] text-[10px] leading-4 md:mb-2 md:max-w-none md:text-lg">
          A.I. HAS ESTIMATED THE FOLLOWING.
        </p>

        <p className="max-w-[170px] text-[10px] leading-4 md:max-w-none md:text-lg">
          FIX ESTIMATED INFORMATION IF NEEDED.
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center pt-28 md:pt-0">
        <div className="relative mt-10 h-[260px] w-[260px] md:mt-24 md:h-[500px] md:w-[500px]">
          <Link
            href="/demographics"
            className="absolute left-1/2 top-0 flex h-[115px] w-[115px] -translate-x-1/2 rotate-45 items-center justify-center border-[4px] border-white bg-gray-200 transition-all duration-300 hover:scale-105 hover:bg-gray-300 md:h-[220px] md:w-[220px] md:border-[6px]"
          >
            <span className="-rotate-45 text-center text-[9px] font-bold md:text-lg">
              DEMOGRAPHICS
            </span>
          </Link>

          <Link
            href="/cosmetic-concerns"
            className="absolute left-0 top-1/2 flex h-[115px] w-[115px] -translate-y-1/2 rotate-45 items-center justify-center border-[4px] border-white bg-gray-100 transition-all duration-300 hover:scale-105 hover:bg-gray-200 md:h-[220px] md:w-[220px] md:border-[6px]"
          >
            <span className="-rotate-45 text-center text-[9px] font-bold md:text-lg">
              COSMETIC
              <br />
              CONCERNS
            </span>
          </Link>

          <Link
            href="/skin-type-details"
            className="absolute right-0 top-1/2 flex h-[115px] w-[115px] -translate-y-1/2 rotate-45 items-center justify-center border-[4px] border-white bg-gray-100 transition-all duration-300 hover:scale-105 hover:bg-gray-200 md:h-[220px] md:w-[220px] md:border-[6px]"
          >
            <span className="-rotate-45 text-center text-[8px] font-bold md:text-lg">
              SKIN TYPE DETAILS
            </span>
          </Link>

          <Link
            href="/weather"
            className="absolute bottom-0 left-1/2 flex h-[115px] w-[115px] -translate-x-1/2 rotate-45 items-center justify-center border-[4px] border-white bg-gray-100 transition-all duration-300 hover:scale-105 hover:bg-gray-200 md:h-[220px] md:w-[220px] md:border-[6px]"
          >
            <span className="-rotate-45 text-center text-[9px] font-bold md:text-lg">
              WEATHER
            </span>
          </Link>
        </div>
      </section>

      <Link
        href="/upload"
        className="absolute bottom-8 left-6 z-20 flex items-center gap-3 text-[9px] font-bold md:bottom-10 md:left-8 md:gap-4 md:text-base"
      >
        <span className="flex h-10 w-10 rotate-45 items-center justify-center border border-black md:h-14 md:w-14">
          <span className="-rotate-45">◀</span>
        </span>
        BACK
      </Link>

      <Link
        href="/demographics"
        className="absolute bottom-8 right-6 z-20 flex items-center gap-3 text-[9px] font-bold md:bottom-10 md:right-8 md:gap-4 md:text-base"
      >
        GET SUMMARY
        <span className="flex h-10 w-10 rotate-45 items-center justify-center border border-black md:h-14 md:w-14">
          <span className="-rotate-45">▶</span>
        </span>
      </Link>
    </main>
  );
}