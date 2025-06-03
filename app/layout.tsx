import './globals.css';
import type { Metadata } from 'next';
import Navigation from './components/Navigation';

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
      <body style={{ fontFamily: 'Cascadia, monospace' }} className="bg-[#16161d] text-gray-100">
        <Navigation />
        <div className="pt-12">
          {children}
        </div>
      </body>
    </html>
  );
}
