import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="p-8">
        <p className="text-sm font-bold">
          SKINSTRIC <span className="text-gray-400">[ INTRO ]</span>
        </p>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] animate-very-slow-spin">
  <div className="absolute inset-0 rotate-[8deg] border border-dotted border-gray-400 opacity-50" />
  <div className="absolute inset-0 rotate-[22deg] border border-dotted border-gray-400 opacity-50" />
  <div className="absolute inset-0 rotate-[36deg] border border-dotted border-gray-400 opacity-50" />
  <div className="absolute inset-0 rotate-[50deg] border border-dotted border-gray-400 opacity-50" />
</div>

      <div className="relative flex min-h-[80vh] items-center justify-center">
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-light">Thank you!</h1>
          <p className="mt-4 text-2xl text-gray-500">
            Proceed for the next step
          </p>
        </div>
      </div>

      <Link
        href="/location"
        className="absolute bottom-30 left-8 flex items-center gap-4 font-bold"
      >
        <span className="flex h-16 w-16 rotate-45 items-center justify-center border border-black">
          <span className="-rotate-45">◀</span>
        </span>
        BACK
      </Link>

      <Link
        href="/upload"
        className="absolute bottom-30 right-8 flex items-center gap-4 font-bold"
      >
        PROCEED
        <span className="flex h-16 w-16 rotate-45 items-center justify-center border border-black">
          <span className="-rotate-45">▶</span>
        </span>
      </Link>
    </main>
  );
}