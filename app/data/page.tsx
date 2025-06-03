import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "Recovery Loop",
    description: "Visualizing how my recovery and cardiovascular adaptation interacts with my strength training performance.",
  }
];

export default function Data() {
  return (
    <main className="min-h-screen p-24 bg-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Projects & Data</h1>
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-gray-400 mb-4">{project.description}</p>
              {project.link && (
                <Link 
                  href={project.link}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Learn more →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 