import Link from 'next/link';

interface Project {
  title: string;
  date: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "Coming Soon",
    date: "TBD",
    link: undefined
  }
  // Add more projects as they become available
];

export default function Data() {
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 pt-10">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-[#e6c384] text-4xl sm:text-5xl mb-12">Data</h1>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <h2 className="text-[#e6c384] text-xl">{project.title}</h2>
                <span className="text-[#7c7c7c]">{project.date}</span>
              </div>
              {project.link && (
                <div className="mt-2">
                  <Link 
                    href={project.link}
                    className="text-[#7c7c7c] hover:text-[#e6c384] transition-colors text-sm"
                  >
                    learn more
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 