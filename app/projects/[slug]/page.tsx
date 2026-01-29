import { projects } from '@/lib/projectsData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ZotWeeContent from '../zothacks/ZotWeeContent';
import VulnkvContent from '../vulnkv/VulnkvContent';

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

  if (project.slug === 'zothacks') {
    return (
      <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 pt-20 pb-20">
        <div className="max-w-2xl w-full mx-auto">
          <h1 className="text-[#c8c8c8] text-5xl sm:text-6xl mb-4 font-normal">{project.title}</h1>
          <p className="text-[#969696] text-base mb-8">ZotHacks 2023</p>
          <div className="border-t border-[#2a2a2a] pt-8">
            <ZotWeeContent />
          </div>
        </div>
      </div>
    );
  }

  if (project.slug === 'vulnkv') {
    return (
      <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 pt-20 pb-20">
        <div className="max-w-4xl w-full">
          <h1 className="text-[#c8c8c8] text-5xl sm:text-6xl mb-4 font-normal">{project.title}</h1>
          <p className="text-[#969696] text-base mb-8">{project.description}</p>

          <div className="border-t border-[#2a2a2a] pt-8">
            <VulnkvContent />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 pt-20 pb-20">
      <div className="max-w-4xl w-full">
        <h1 className="text-[#c8c8c8] text-5xl sm:text-6xl mb-4 font-normal">{project.title}</h1>
        <p className="text-[#969696] text-base mb-8">{project.description}</p>

        <div className="border-t border-[#2a2a2a] pt-8">
          <h2 className="text-[#c8c8c8] text-lg mb-4">Project Details</h2>
          <p className="text-[#969696] text-sm">
            [The full project details will be built out right here...]
          </p>
        </div>
      </div>
    </div>
  );
} 