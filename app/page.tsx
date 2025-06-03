import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#1f1f28] text-white">
      <div className="max-w-2xl">
        <h1 className="text-7xl font-bold mb-2 text-[#e6c384]">
          Logan Szeto
        </h1>
        <p className="text-2xl text-[#565f89] mb-4 font-light tracking-wide">
          Irvine, CA
        </p>
        <p className="text-xl mb-8 leading-relaxed text-white">
          Student at UCI studying software engineering with a focus in data and AI alignment. Strength Training Enthusiast.
        </p>
        <div className="flex space-x-6 mt-12">
          <Link
            href="https://github.com/loganszeto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-white hover:text-[#565f89] transition-colors"
          >
            <FaGithub />
          </Link>
          <Link
            href="https://linkedin.com/in/loganszeto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-white hover:text-[#565f89] transition-colors"
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </main>
  );
}
