import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <header className="absolute left-8 top-8 right-8 flex items-center justify-between text-sm font-bold">
        <div>SKINSTRIC</div>
        <button className="bg-black px-5 py-3 text-white text-xs">
          ENTER CODE
        </button>
      </header>

      <section className="flex min-h-screen items-center justify-center">
        <h1 className="text-center text-[64px] font-normal leading-[0.9] tracking-[-0.07em]">
          Sophisticated
          <br />
          skincare
        </h1>
      </section>

      <button className="absolute left-10 top-1/2 text-xs font-bold">
        ◀ DISCOVER A.I.
      </button>

      <Link
  href="/intro"
  className="absolute right-10 top-1/2 text-xs font-bold"
>
  TAKE TEST ▶
</Link>
    </main>
  );
}