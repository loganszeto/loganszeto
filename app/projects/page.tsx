import Link from 'next/link';
import { projects } from '@/lib/projectsData';

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project.slug}>
            <div className="block p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 h-full">
              <h2 className="mb-2 text-2xl font-bold tracking-tight">{project.title}</h2>
              <p className="font-normal text-gray-400">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
} 