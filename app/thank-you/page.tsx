import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <div className="p-8">
        <p className="text-sm font-bold">SKINSTRIC [ INTRO ]</p>
      </div>

      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-6 text-6xl font-light">
            Thank You!
          </h1>

          <p className="text-2xl text-gray-500">
            Proceed for the next step
          </p>

          <div className="mt-12">
            <Link
              href="/upload"
              className="bg-black px-8 py-4 text-white"
            >
              PROCEED
            </Link>
          </div>
        </div>
      </div>

      <Link
        href="/location"
        className="absolute bottom-10 left-8 flex items-center gap-4 font-bold"
      >
        <span className="flex h-16 w-16 rotate-45 items-center justify-center border border-black">
          <span className="-rotate-45">◀</span>
        </span>
        BACK
      </Link>
    </main>
  );
}