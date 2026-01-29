import Link from 'next/link';
import VulnkvDemo from './VulnkvDemo';

export default function VulnkvDataPage() {
  return (
    <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 pt-24 pb-24">
      <div className="max-w-5xl w-full mx-auto space-y-16">
        <section className="space-y-4">
          <h1 className="text-[#c8c8c8] text-4xl sm:text-5xl font-normal">
            vulnkv — a persistent key-value store built from scratch in Go
          </h1>
          <p className="text-[#969696] text-base max-w-2xl">
            Concurrent TCP server, write-ahead logging, crash recovery, TTL, and a live interactive demo.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#demo"
              className="px-4 py-2 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors text-sm"
            >
              Try the live demo
            </a>
            <a
              href="https://github.com/loganszeto/kvstore-go"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors text-sm"
            >
              View on GitHub
            </a>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">Interactive Terminal</h2>
          <VulnkvDemo />
        </section>

        <section className="space-y-3">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">What just happened?</h2>
          <p className="text-[#969696] text-sm max-w-3xl">
            Every command you type is sent to a live instance of vulnkv. The server logs each change to a write-ahead log,
            updates an in-memory store for speed, and returns a response. When you simulate a restart, the server replays the
            log to restore state.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">Flow</h2>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#c8c8c8]">
            {['Browser', 'WebSocket', 'KV Engine', 'WAL', 'Memory'].map((label, index) => (
              <div key={label} className="flex items-center gap-3">
                <div className="border border-[#2a2a2a] px-4 py-2 bg-black/30">{label}</div>
                {index < 4 && <span className="text-[#6f6f6f]">→</span>}
              </div>
            ))}
          </div>
          <p className="text-[#969696] text-sm">
            The demo uses WebSockets to communicate with the same KV engine used by the TCP server implementation in the repo.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">Engineering highlights</h2>
          <ul className="list-disc list-inside text-[#969696] text-sm space-y-2">
            <li>Goroutine-per-connection concurrency model.</li>
            <li>Write-ahead log with CRC checks and safe replay on startup.</li>
            <li>Lazy TTL expiration without background sweeps.</li>
            <li>Integration tests over real TCP sockets.</li>
            <li>Benchmark tool measuring ops/sec and p99 latency.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">Quick demo snapshot</h2>
          <div className="border border-[#2a2a2a] bg-black/30 p-4">
            <img src="/vulnkv-demo.svg" alt="vulnkv demo terminal snapshot" className="w-full" />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">Read the deep dive</h2>
          <a
            href="https://github.com/loganszeto/kvstore-go/blob/main/docs/storage.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c8c8c8] hover:text-white transition-colors text-sm"
          >
            Read the full design breakdown →
          </a>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">Repo structure</h2>
          <pre className="text-[#c8c8c8] text-sm bg-black/40 border border-[#2a2a2a] p-4 overflow-x-auto">
{`cmd/kv-server
internal/protocol
internal/store
internal/persistence`}
          </pre>
        </section>

        <section className="space-y-4">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">What makes it interactive</h2>
          <div className="overflow-x-auto border border-[#2a2a2a]">
            <table className="min-w-full text-sm">
              <thead className="bg-black/40 text-[#c8c8c8]">
                <tr>
                  <th className="px-4 py-2 text-left">User action</th>
                  <th className="px-4 py-2 text-left">What happens</th>
                </tr>
              </thead>
              <tbody className="text-[#969696]">
                <tr className="border-t border-[#2a2a2a]">
                  <td className="px-4 py-2">Types command</td>
                  <td className="px-4 py-2">Sent over WebSocket to a live server instance.</td>
                </tr>
                <tr className="border-t border-[#2a2a2a]">
                  <td className="px-4 py-2">Clicks “Load CVE sample”</td>
                  <td className="px-4 py-2">Populates realistic CVE keys and verifies them with a GET.</td>
                </tr>
                <tr className="border-t border-[#2a2a2a]">
                  <td className="px-4 py-2">Clicks “Simulate restart”</td>
                  <td className="px-4 py-2">Reconnects and shows WAL-backed state still available.</td>
                </tr>
                <tr className="border-t border-[#2a2a2a]">
                  <td className="px-4 py-2">Runs mini benchmark</td>
                  <td className="px-4 py-2">Measures ops/sec against the live engine.</td>
                </tr>
                <tr className="border-t border-[#2a2a2a]">
                  <td className="px-4 py-2">Types KEYS cve:*</td>
                  <td className="px-4 py-2">Returns real data that was just loaded.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#969696] text-sm">
            You are driving the demo — every button and command hits the same live engine.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#c8c8c8] text-2xl font-normal">Looking for more?</h2>
          <p className="text-[#969696] text-sm">
            Explore the full project detail page for architecture context and additional benchmarks.
          </p>
          <Link href="/projects/vulnkv" className="text-[#c8c8c8] hover:text-white transition-colors text-sm">
            Project overview →
          </Link>
        </section>
      </div>
    </div>
  );
}
