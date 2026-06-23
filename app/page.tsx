import Link from "next/link";

export default function Home() {
  return (
    <main className="group relative min-h-screen overflow-hidden bg-white text-black">
      <header className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between text-[8px] font-bold md:left-8 md:right-8 md:top-8 md:text-sm">
        <div>SKINSTRIC</div>

        <button className="bg-black px-3 py-2 text-[7px] text-white md:px-5 md:py-3 md:text-xs">
          ENTER CODE
        </button>
      </header>

      <div className="absolute left-[-145px] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rotate-45 border border-gray-200 md:left-[-160px] md:h-[430px] md:w-[430px] md:border-gray-300" />

      <div className="absolute right-[-145px] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rotate-45 border border-gray-200 md:right-[-160px] md:h-[430px] md:w-[430px] md:border-gray-300" />

      <section className="flex min-h-screen items-center justify-center px-4">
        <h1 className="text-center text-[40px] font-light leading-[0.95] tracking-[-0.08em] transition-all duration-500 ease-in-out sm:text-[56px] md:text-[115px] md:group-has-[.take-test:hover]:-translate-x-32 md:group-has-[.discover-ai:hover]:translate-x-32">
          Sophisticated
          <br />
          skincare
        </h1>
      </section>

      <p className="absolute left-1/2 top-[55%] w-[220px] -translate-x-1/2 text-center text-[7px] font-medium leading-3 md:bottom-14 md:left-10 md:top-auto md:w-auto md:max-w-sm md:translate-x-0 md:text-left md:text-sm md:leading-5">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A
        <br />
        HIGHLY-PERSONALIZED ROUTINE TAILORED TO
        <br />
        WHAT YOUR SKIN NEEDS.
      </p>

      <button className="discover-ai absolute left-[26%] top-[62%] flex -translate-x-1/2 items-center gap-2 text-[7px] font-bold transition-all duration-300 hover:scale-105 md:left-20 md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:gap-4 md:text-sm">
        <span className="flex h-6 w-6 rotate-45 items-center justify-center border border-black md:h-12 md:w-12">
          <span className="-rotate-45 text-[8px] md:text-base">◀</span>
        </span>
        DISCOVER A.I.
      </button>

      <Link
        href="/intro"
        className="take-test absolute right-[26%] top-[62%] flex translate-x-1/2 items-center gap-2 text-[7px] font-bold transition-all duration-300 hover:scale-105 md:right-20 md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:gap-4 md:text-sm"
      >
        TAKE TEST
        <span className="flex h-6 w-6 rotate-45 items-center justify-center border border-black md:h-12 md:w-12">
          <span className="-rotate-45 text-[8px] md:text-base">▶</span>
        </span>
      </Link>
    </main>
  );
}