'use client';

import { useEffect, useRef, useState } from 'react';

const DEFAULT_WS_URL = 'wss://kv-demo-389510831213.us-central1.run.app/ws';

type LogEntry = {
  id: number;
  text: string;
};

function buildSetCommand(key: string, value: string) {
  return `SET ${key} ${value.length}\n${value}\n`;
}

function buildSetExCommand(key: string, ttlSeconds: number, value: string) {
  return `SETEX ${key} ${ttlSeconds} ${value.length}\n${value}\n`;
}

export default function VulnkvContent() {
  const wsUrl = process.env.NEXT_PUBLIC_KV_DEMO_WS_URL || DEFAULT_WS_URL;
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [log, setLog] = useState<LogEntry[]>([]);
  const [input, setInput] = useState('');
  const nextId = useRef(1);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appendLog = (text: string) => {
    setLog((prev) => [...prev, { id: nextId.current++, text }]);
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
      appendLog(`connected -> ${wsUrl}`);
    };
    ws.onmessage = (event) => {
      appendLog(event.data);
    };
    ws.onclose = () => {
      setStatus('disconnected');
      appendLog('disconnected');
    };
    ws.onerror = () => {
      appendLog('connection error');
    };
  };

  const send = (payload: string) => {
    if (!payload.trim()) {
      return;
    }
    if (!wsRef.current || status !== 'connected') {
      appendLog('not connected');
      return;
    }
    wsRef.current.send(payload);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    send(input.endsWith('\n') ? input : input + '\n');
    setInput('');
  };

  const runSample = (payload: string) => {
    send(payload);
  };

  const clearLog = () => setLog([]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-[#969696] text-sm">
          Live demo (WebSocket) against the deployed KV server.
        </p>
        <p className="text-[#6f6f6f] text-xs">
          Endpoint: {wsUrl}
        </p>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#6f6f6f]">Status:</span>
          <span className={status === 'connected' ? 'text-[#9ad19a]' : status === 'connecting' ? 'text-[#d9c28a]' : 'text-[#d38a8a]'}>
            {status}
          </span>
          <button
            type="button"
            onClick={connect}
            className="px-2 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors"
          >
            Connect
          </button>
          <button
            type="button"
            onClick={clearLog}
            className="px-2 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => runSample('PING\n')}
            className="px-2 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors"
          >
            PING
          </button>
          <button
            type="button"
            onClick={() => runSample(buildSetCommand('hello', 'world'))}
            className="px-2 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors"
          >
            SET hello world
          </button>
          <button
            type="button"
            onClick={() => runSample('GET hello\n')}
            className="px-2 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors"
          >
            GET hello
          </button>
          <button
            type="button"
            onClick={() => runSample(buildSetExCommand('temp', 2, 'bye'))}
            className="px-2 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors"
          >
            SETEX temp 2 bye
          </button>
          <button
            type="button"
            onClick={() => runSample('KEYS *\n')}
            className="px-2 py-1 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors"
          >
            KEYS *
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder="Type a command, e.g. GET hello"
            className="w-full bg-black/30 border border-[#2a2a2a] text-[#c8c8c8] text-sm p-3 focus:outline-none"
          />
          <button
            type="submit"
            className="px-3 py-2 border border-[#2a2a2a] text-[#c8c8c8] hover:text-white transition-colors text-sm"
          >
            Send
          </button>
        </form>
      </div>

      <div className="border border-[#2a2a2a] bg-black/40 p-4 text-xs text-[#c8c8c8] h-64 overflow-auto whitespace-pre-wrap">
        {log.length === 0 ? 'No output yet.' : log.map((entry) => (
          <div key={entry.id}>{entry.text}</div>
        ))}
      </div>
    </div>
  );
}
