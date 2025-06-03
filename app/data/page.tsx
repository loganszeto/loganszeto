import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "AI Alignment Research",
    description: "Exploring methods to ensure AI systems remain aligned with human values and intentions.",
  },
  {
    title: "Data Analysis Projects",
    description: "Collection of data science and machine learning projects focused on real-world applications.",
  },
  // Add more projects as they become available
];

export default function Data() {
  return (
    <main className="min-h-screen p-24 bg-[#1f1f28] text-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Projects & Data</h1>
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-[#1f1f28] p-6 rounded-lg">
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