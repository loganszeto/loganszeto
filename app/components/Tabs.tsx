'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Tab {
  name: string;
  path: string;
  icon?: string;
}

const tabs: Tab[] = [
  { name: 'home', path: '/' },
  { name: 'posts', path: '/posts' },
  { name: 'data', path: '/data' },
];

export default function Tabs() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex bg-[#16161d] border-b border-[#363646]">
        {tabs.map((tab) => {
          const isActive = tab.path === '/' ? pathname === '/' : pathname.startsWith(tab.path);
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`
                px-8 py-1 flex items-center gap-2 text-base
                border-r border-[#363646]
                ${isActive ? 'bg-[#2a2a37]' : 'hover:bg-[#2a2a37]'} transition-colors
              `}
            >
              <span className="text-[#e6c384]">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 