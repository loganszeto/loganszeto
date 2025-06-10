import './globals.css';
import type { Metadata } from 'next';
import Tabs from './components/Tabs';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Logan Szeto',
  description: 'Software Engineer & Data Scientist',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-[#1f1f28] text-[#c8c093] ${inter.className}`}>
        <Tabs />
        <div className="editor-content p-6">
          {children}
        </div>
      </body>
    </html>
  );
}
