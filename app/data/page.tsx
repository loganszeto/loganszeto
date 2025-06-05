import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "The Recovery Loop",
    description: "A comprehensive platform designed to support individuals in their recovery journey, providing tools and resources for maintaining sobriety and mental well-being.",
    link: "/projects/recovery-loop"
  }
  // Add more projects as they become available
];

export default function Data() {
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 pt-10">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-[#e6c384] text-4xl sm:text-5xl mb-6">Projects & Data</h1>
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div key={index} className="rounded-lg">
              <h2 className="text-2xl sm:text-3xl text-[#e6c384] mb-2">{project.title}</h2>
              <p className="text-gray-400 text-base sm:text-lg mb-4">{project.description}</p>
              {project.link && (
                <Link 
                  href={project.link}
                  className="text-[#e6c384] hover:text-gray-400 transition-colors"
                >
                  Learn more →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 