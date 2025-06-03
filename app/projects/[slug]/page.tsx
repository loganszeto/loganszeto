import { projects } from '@/lib/projectsData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find(p => p.slug === params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

// This function tells Next.js which slugs (project pages) to pre-build
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug);

  if (!project) {
    // If no project with that slug is found, show a 404 page
    notFound();
  }

  // Simulate async operation to satisfy TypeScript
  await Promise.resolve();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-extrabold mb-4">{project.title}</h1>
      <p className="text-xl text-gray-400 mb-8">{project.description}</p>

      <div className="bg-gray-800 p-8 rounded-lg min-h-[400px]">
        <h2 className="text-2xl font-bold text-white">Project Details & Visualizations</h2>
        <p className="text-gray-300 mt-4">
          [The full project details will be built out right here...]
        </p>
      </div>
    </main>
  );
} 