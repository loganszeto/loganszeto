import Link from 'next/link';
import { projects } from '@/lib/projectsData';

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 pt-20 pb-20">
      <div className="max-w-4xl w-full">
        <h1 className="text-[#c8c8c8] text-5xl sm:text-6xl mb-12 font-normal">Projects</h1>
        <div className="space-y-4">
          {projects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.slug}>
              <div className="block">
                <h2 className="text-[#c8c8c8] text-base mb-1 hover:text-[#c8c8c8] transition-colors">{project.title}</h2>
                <p className="text-[#969696] text-sm">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 