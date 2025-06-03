import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-gray-900 text-gray-100 font-sans">
        <nav className="fixed w-full bg-gray-800 bg-opacity-90 backdrop-blur-sm z-50">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold hover:text-gray-300 transition-colors font-playfair">
                Logan Szeto
              </Link>
              <div className="flex space-x-8">
                <Link href="/posts" className="hover:text-gray-300 transition-colors">
                  Posts
                </Link>
                <Link href="/data" className="hover:text-gray-300 transition-colors">
                  Data
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
