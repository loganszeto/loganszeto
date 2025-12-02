'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href} 
      className={`text-base text-[#e6c384] hover:text-gray-300 transition-colors px-6 py-2 border-r border-[#363646] ${
        isActive ? 'bg-[#2a2a37]' : ''
      }`}
    >
      {children}
    </Link>
  );
}

export default function Navigation() {
  return (
    <nav className="fixed w-full bg-[#16161d] bg-opacity-90 backdrop-blur-sm z-50 border-b border-[#363646]">
      <div className="px-0">
        <div className="flex items-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/experience">Experience</NavLink>
          <NavLink href="/data">Data</NavLink>
        </div>
      </div>
    </nav>
  );
} 