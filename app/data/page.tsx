import Link from 'next/link';

interface Project {
  title: string;
  date: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "Key Value Store",
    date: "2025",
    link: "/data/vulnkv"
  },
  {
    title: "Apple Watch Data",
    date: "2025",
    link: "https://health-auto-export.vercel.app"
  },
  {
    title: "ZotHacks",
    date: "2023",
    link: "/projects/zothacks"
  }
];

export default function Data() {
  return (
    <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 pt-32 pb-20">
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="text-[#c8c8c8] text-5xl sm:text-6xl mb-4 font-normal">Data</h1>
        <div className="border-t border-[#2a2a2a] pt-8">
          <div className="space-y-2">
            {projects.map((project, index) => (
              <div key={index} className="flex justify-between items-center">
                {project.link ? (
                  project.link.startsWith('http') ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c8c8c8] hover:opacity-80 transition-opacity text-sm"
                    >
                      {project.title}
                    </a>
                  ) : (
                    <Link
                      href={project.link}
                      className="text-[#c8c8c8] hover:opacity-80 transition-opacity text-sm"
                    >
                      {project.title}
                    </Link>
                  )
                ) : (
                  <h2 className="text-[#c8c8c8] text-sm">{project.title}</h2>
                )}
                <span className="text-[#969696] text-sm">{project.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 