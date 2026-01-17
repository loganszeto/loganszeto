import Link from 'next/link';

interface Project {
  title: string;
  date: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "Health Auto Export",
    date: "2025",
    link: "https://health-auto-export.vercel.app"
  },
  {
    title: "Vending Pokemon",
    date: "2025",
    link: "/projects/vending-pokemon"
  }
];

export default function Data() {
  return (
    <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 pt-32 pb-20">
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="text-[#c8c8c8] text-5xl sm:text-6xl mb-12 font-normal">Data</h1>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <h2 className="text-[#c8c8c8] text-base">{project.title}</h2>
                <span className="text-[#969696] text-sm">{project.date}</span>
              </div>
              {project.link && (
                <div className="mt-1">
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#969696] hover:text-[#c8c8c8] transition-colors text-sm"
                  >
                    learn more
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 