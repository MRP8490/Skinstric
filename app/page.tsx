import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <header className="absolute left-8 right-8 top-8 z-10 flex items-center justify-between text-sm font-bold">
        <div>SKINSTRIC</div>
        <button className="bg-black px-5 py-3 text-xs text-white">
          ENTER CODE
        </button>
      </header>

      <div className="absolute left-[-160px] top-1/2 h-[430px] w-[430px] -translate-y-1/2 rotate-45 border border-gray-300" />
      <div className="absolute right-[-160px] top-1/2 h-[430px] w-[430px] -translate-y-1/2 rotate-45 border border-gray-300" />

      <section className="flex min-h-screen animate-[fadeIn_0.8s_ease-in-out] items-center justify-center">
        <h1 className="text-center text-[115px] font-light leading-[0.95] tracking-[-0.08em]">
          Sophisticated
          <br />
          skincare
        </h1>
      </section>

      <button className="absolute left-20 top-1/2 flex -translate-y-1/2 items-center gap-4 text-sm font-bold">
        <span className="flex h-12 w-12 rotate-45 items-center justify-center border border-black">
          <span className="-rotate-45">◀</span>
        </span>
        DISCOVER A.I.
      </button>

      <Link
        href="/intro"
        className="absolute right-20 top-1/2 flex -translate-y-1/2 items-center gap-4 text-sm font-bold"
      >
        TAKE TEST
        <span className="flex h-12 w-12 rotate-45 items-center justify-center border border-black">
          <span className="-rotate-45">▶</span>
        </span>
      </Link>

      <p className="absolute bottom-14 left-10 max-w-sm text-sm font-medium leading-5">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A
        <br />
        HIGHLY-PERSONALIZED ROUTINE TAILORED TO
        <br />
        WHAT YOUR SKIN NEEDS.
      </p>
    </main>
  );
}