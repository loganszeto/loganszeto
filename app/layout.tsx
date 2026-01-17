import './globals.css';
import type { Metadata } from 'next';
import Tabs from './components/Tabs';

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
      <body className="bg-[#141414] text-[#c8c8c8] font-sans">
        <Tabs />
        <div className="editor-content">
          {children}
        </div>
      </body>
    </html>
  );
}
