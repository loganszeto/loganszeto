'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Tab {
  name: string;
  path: string;
  icon?: string;
}

const tabs: Tab[] = [
  { name: 'home.tsx', path: '/' },
  { name: 'posts.tsx', path: '/posts' },
  { name: 'data.tsx', path: '/data' },
];

export default function Tabs() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex bg-[#16161d] border-b border-[#363646]">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`
                px-6 py-3 flex items-center gap-2 text-base
                border-r border-[#363646]
                hover:bg-[#2a2a37] transition-colors
                ${isActive ? 'bg-[#2a2a37]' : ''}
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