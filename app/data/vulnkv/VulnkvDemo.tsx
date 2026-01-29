'use client';

import { useEffect, useRef, useState } from 'react';

const DEFAULT_WS_URL = 'wss://kv-demo-389510831213.us-central1.run.app/ws';

type DemoStatus = 'disconnected' | 'connecting' | 'connected';

type NormalizedCommand = {
  display: string;
  payload: string;
};

function buildSetCommand(key: string, value: string) {
  return `SET ${key} ${value.length}\n${value}\n`;
}

function buildSetExCommand(key: string, ttlSeconds: number, value: string) {
  return `SETEX ${key} ${ttlSeconds} ${value.length}\n${value}\n`;
}

function normalizeCommand(raw: string): NormalizedCommand | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.includes('\n')) {
    return { display: trimmed, payload: trimmed.endsWith('\n') ? trimmed : trimmed + '\n' };
  }

  const [cmd, ...rest] = trimmed.split(' ');
  const upper = cmd.toUpperCase();

  if (upper === 'SET' && rest.length >= 2) {
    const key = rest[0];
    const value = rest.slice(1).join(' ');
    return {
      display: `SET ${key} ${value}`,
      payload: buildSetCommand(key, value),
    };
  }

  if (upper === 'SETEX' && rest.length >= 3) {
    const key = rest[0];
    const ttl = Number(rest[1]);
    const value = rest.slice(2).join(' ');
    if (!Number.isNaN(ttl)) {
      return {
        display: `SETEX ${key} ${ttl} ${value}`,
        payload: buildSetExCommand(key, ttl, value),
      };
    }
  }

  return {
    display: trimmed,
    payload: trimmed.endsWith('\n') ? trimmed : trimmed + '\n',
  };
}

function splitLines(text: string) {
  const lines = text.replace(/\r/g, '').split('\n');
  if (lines.length > 0 && lines[lines.length - 1] === '') {
    lines.pop();
  }
  return lines;
}

function parseArrayResponse(resp: string) {
  const lines = splitLines(resp);
  if (lines.length === 0 || !lines[0].startsWith('ARRAY')) {
    return [];
  }
  return lines.slice(1);
}

export default function VulnkvDemo() {
  const wsUrl = process.env.NEXT_PUBLIC_KV_DEMO_WS_URL || DEFAULT_WS_URL;
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<DemoStatus>('disconnected');
  const [logLines, setLogLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const pendingResolvers = useRef<Array<(resp: string) => void>>([]);
  const onOpenRef = useRef<(() => void) | null>(null);
  const hasRunIntro = useRef(false);
  const hasSampleData = useRef(false);
  const terminalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logLines]);

  const appendLine = (text: string) => {
    setLogLines((prev) => {
      const next = [...prev, text];
      if (next.length > 220) {
        return next.slice(-220);
      }
      return next;
    });
  };

  const appendPayload = (payload: string) => {
    splitLines(payload).forEach((line) => appendLine(line));
  };

  const connect = () => {
    if (status === 'connected' || status === 'connecting') {
      return;
    }
    setStatus('connecting');
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      appendLine(`connected -> ${wsUrl}`);
      if (!hasRunIntro.current) {
        hasRunIntro.current = true;
        void runIntro();
      }
      if (onOpenRef.current) {
        onOpenRef.current();
        onOpenRef.current = null;
      }
    };
    ws.onmessage = (event) => {
      const data = typeof event.data === 'string' ? event.data : '';
      appendPayload(data);
      const resolver = pendingResolvers.current.shift();
      if (resolver) {
        resolver(data);
      }
    };
    ws.onclose = () => {
      setStatus('disconnected');
      appendLine('disconnected');
    };
    ws.onerror = () => {
      appendLine('connection error');
    };
  };

  const sendPayload = (payload: string, display: string) => {
    if (!wsRef.current || status !== 'connected') {
      appendLine('not connected');
      return Promise.resolve('');
    }
    appendLine(`> ${display}`);
    return new Promise<string>((resolve) => {
      pendingResolvers.current.push(resolve);
      wsRef.current?.send(payload);
    });
  };

  const sendCommand = (raw: string) => {
    const normalized = normalizeCommand(raw);
    if (!normalized) {
      return Promise.resolve('');
    }
    return sendPayload(normalized.payload, normalized.display);
  };

  const runIntro = async () => {
    await sendCommand('SET hello world');
    await sendCommand('GET hello');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) {
      return;
    }
    await sendCommand(input);
    setInput('');
  };

  const runAction = async (action: () => Promise<void>) => {
    if (busy) {
      return;
    }
    setBusy(true);
    try {
      await action();
    } finally {
      setBusy(false);
    }
  };

  const loadCveSample = () =>
    runAction(async () => {
      const cveJson = '{"cve":"CVE-2024-1234","severity":"HIGH","summary":"Example vuln for demo","affected":["cpe:microsoft:office:2019"]}';
      const cpeJson = '["CVE-2024-1234","CVE-2023-9999"]';
      await sendPayload(buildSetCommand('cve:CVE-2024-1234', cveJson), `SET cve:CVE-2024-1234 ${cveJson}`);
      await sendPayload(buildSetCommand('cpe:microsoft:office:2019', cpeJson), `SET cpe:microsoft:office:2019 ${cpeJson}`);
      await sendCommand('GET cpe:microsoft:office:2019');
      hasSampleData.current = true;
    });

  const simulateRestart = () =>
    runAction(async () => {
      appendLine('> Simulate server restart');
      appendLine('restarting demo connection...');
      wsRef.current?.close();
      onOpenRef.current = async () => {
        appendLine('replay complete (state restored)');
        const key = hasSampleData.current ? 'cve:CVE-2024-1234' : 'hello';
        await sendCommand(`GET ${key}`);
      };
      setTimeout(connect, 600);
    });

  const clearData = () =>
    runAction(async () => {
      const resp = await sendCommand('KEYS *');
      const keys = parseArrayResponse(resp);
      if (keys.length === 0) {
        appendLine('no keys to delete');
        return;
      }
      for (const key of keys) {
        await sendCommand(`DEL ${key}`);
      }
    });

  const runBenchmark = () =>
    runAction(async () => {
      const ops = 20;
      const start = performance.now();
      for (let i = 0; i < ops; i += 1) {
        await sendCommand(`SET bench:${i} value-${i}`);
      }
      for (let i = 0; i < ops; i += 1) {
        await sendCommand(`GET bench:${i}`);
      }
      const elapsedMs = performance.now() - start;
      const totalOps = ops * 2;
      const perSec = Math.round((totalOps / (elapsedMs / 1000)) * 10) / 10;
      appendLine(`benchmark: ${totalOps} ops in ${(elapsedMs / 1000).toFixed(2)}s (${perSec} ops/sec)`);
    });

  const clearOutput = () => setLogLines([]);

  return (
    <div id="demo" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#6f6f6f]">
        <div className="flex items-center gap-2">
          <span>Status:</span>
          <span className={status === 'connected' ? 'text-[#9ad19a]' : status === 'connecting' ? 'text-[#d9c28a]' : 'text-[#d38a8a]'}>
            {status}
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Endpoint: {wsUrl}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            type="button"
            onClick={connect}
            className="px-2 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors"
          >
            Connect
          </button>
          <button
            type="button"
            onClick={clearOutput}
            className="px-2 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors"
          >
            Clear Output
          </button>
          <button
            type="button"
            onClick={loadCveSample}
            disabled={busy}
            className="px-2 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors disabled:opacity-50"
          >
            Load CVE Sample
          </button>
          <button
            type="button"
            onClick={simulateRestart}
            disabled={busy}
            className="px-2 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors disabled:opacity-50"
          >
            Server Restart
          </button>
          <button
            type="button"
            onClick={clearData}
            disabled={busy}
            className="px-2 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors disabled:opacity-50"
          >
            Clear Data
          </button>
          <button
            type="button"
            onClick={runBenchmark}
            disabled={busy}
            className="px-2 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors disabled:opacity-50"
          >
            Run Mini Benchmark
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg border border-[#2a2a2a] bg-black/40">
          <div className="flex items-center justify-between border-b border-[#2a2a2a] px-3 py-2 text-xs text-[#969696]">
            <span className="uppercase tracking-wide">Interactive Terminal</span>
            <span className="text-[#6f6f6f]">vulnkv</span>
          </div>
          <div ref={terminalRef} className="h-72 overflow-auto px-4 py-3 font-mono text-xs text-[#c8c8c8] whitespace-pre-wrap">
            {logLines.length === 0 ? 'No output yet.' : logLines.map((line, index) => (
              <div key={`${index}-${line}`}>{line}</div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[#2a2a2a] px-3 py-2">
            <span className="font-mono text-sm text-[#c8c8c8]">{'>'}</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type: SET hello world"
              className="flex-1 bg-transparent text-sm text-[#c8c8c8] focus:outline-none placeholder:text-[#6f6f6f]"
            />
            <button
              type="submit"
              className="px-3 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors text-sm"
            >
              Send
            </button>
          </form>
        </div>

      </div>

      <p className="text-xs text-[#6f6f6f]">
        Commands supported: <span className="text-[#c8c8c8]">SET key value</span>, <span className="text-[#c8c8c8]">GET key</span>,
        <span className="text-[#c8c8c8]"> DEL key</span>, <span className="text-[#c8c8c8]">EXPIRE key 10</span>,
        <span className="text-[#c8c8c8]"> KEYS prefix*</span>, <span className="text-[#c8c8c8]">STATS</span>
      </p>

    </div>
  );
}
