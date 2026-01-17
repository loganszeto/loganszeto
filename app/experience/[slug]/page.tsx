import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getExperienceBySlug, getAllExperiences } from '@/lib/experienceData';

// Generate static params for all experience items
export function generateStaticParams() {
  const experiences = getAllExperiences();
  return experiences.map((experience) => ({
    slug: experience.slug,
  }));
}

export default function ExperienceDetail({ params }: { params: { slug: string } }) {
  const experience = getExperienceBySlug(params.slug);

  if (!experience) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 pt-32 pb-20">
      <div className="max-w-2xl w-full mx-auto">
        <Link 
          href="/experience" 
          className="text-[#969696] hover:text-[#c8c8c8] transition-colors mb-6 inline-block text-sm"
        >
          ← Back to Experience
        </Link>
        
        <h1 className="text-[#c8c8c8] text-5xl sm:text-6xl mb-4 font-normal">{experience.title}</h1>
        
        <div className="mb-8">
          <p className="text-[#969696] text-base mb-2">
            {experience.organization} | {experience.location}
          </p>
          <p className="text-[#969696] text-sm">{experience.date}</p>
        </div>

        <div className="border-t border-[#2a2a2a] pt-8">
          <div className="text-[#c8c8c8] text-base leading-relaxed whitespace-pre-line">
            {experience.description || 'Description coming soon...'}
          </div>
        </div>
      </div>
    </div>
  );
}
