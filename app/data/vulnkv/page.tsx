import VulnkvDemo from './VulnkvDemo';

export default function VulnkvDataPage() {
  return (
    <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 pt-24 pb-24">
      <div className="max-w-2xl w-full mx-auto space-y-16">
        <section className="space-y-4">
          <h1 className="text-[#c8c8c8] text-4xl sm:text-5xl font-normal">
            Building a Persistent Key Value Store from Scratch in Go
          </h1>
          <p className="text-[#969696] text-base max-w-2xl">
            While building an automated CVE scanning system, I ran into a bottleneck that wasn’t a security problem. It was a
            systems problem.
          </p>
          <p className="text-[#969696] text-sm max-w-2xl">
            Repeatedly parsing large NVD feeds and matching CPE records was slow and redundant. PostgreSQL was great for storage,
            but not for ultra fast repeated lookups. What I really needed was a fast, persistent, concurrent key value store to
            act as a cache and index layer. So instead of reaching for Redis lite, I built one from scratch to understand how these
            systems actually work.
          </p>
          <div className="flex flex-wrap gap-3" />
        </section>

        <section className="space-y-4">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">Interactive Terminal</h2>
          <VulnkvDemo />
          <p className="text-[#969696] text-sm max-w-2xl">
            Every command you type is sent to a live instance of vulnkv. The server logs each change to disk using a write ahead
            log, updates an in memory store for speed, and responds in real time.
          </p>
        </section>

        <section className="space-y-3 -mt-10">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">The bottleneck I hit</h2>
          <p className="text-[#969696] text-sm max-w-3xl">
            The CVE scanner frequently needs to answer: “Given this software version, what vulnerabilities match it?” That
            requires mapping CPE records to CVEs, which means parsing and searching large datasets over and over again. I needed
            something that could keep this index in memory for speed, persist across crashes, and handle concurrent lookups
            safely. That’s the problem vulnkv solves.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">Why this design works</h2>
          <ul className="list-disc list-inside text-[#969696] text-sm space-y-2">
            <li>Clients send commands over TCP.</li>
            <li>Mutations are written to a write ahead log before memory is updated.</li>
            <li>Reads come directly from memory for speed.</li>
            <li>On restart, the log is replayed to restore the exact state.</li>
          </ul>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#c8c8c8]">
            {['Browser', 'WebSocket', 'KV Engine', 'WAL', 'Memory'].map((label, index) => (
              <div key={label} className="flex items-center gap-3">
                <span>{label}</span>
                {index < 4 && <span className="text-[#6f6f6f]">→</span>}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">What makes this nontrivial</h2>
          <p className="text-[#969696] text-sm max-w-3xl">
            Building a key value store is easy. Building one that survives crashes, handles many concurrent clients, persists
            without a database, and enforces TTL without background sweeps is where real systems engineering starts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">Quick demo snapshot</h2>
          <img src="/vulnkv-demo.svg" alt="vulnkv demo terminal snapshot" className="w-full" />
        </section>

        <section className="space-y-3">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">Repo structure</h2>
          <pre className="text-[#c8c8c8] text-sm bg-black/40 border border-[#2a2a2a] p-4 overflow-x-auto">
{`cmd/kv-server
internal/protocol
internal/store
internal/persistence`}
          </pre>
          <p className="text-[#969696] text-sm">
            The website demo is just a thin WebSocket wrapper. The real TCP server, CLI, tests, and benchmark tool are in the
            repository.
          </p>
        </section>

      </div>
    </div>
  );
}
