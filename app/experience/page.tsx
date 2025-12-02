import Link from 'next/link';

interface Research {
  title: string;
  date: string;
  description?: string;
  link?: string;
}

const research: Research[] = [
  {
    title: "Coming Soon",
    date: "TBD",
    description: "Research experiences will be showcased here.",
  }
  // Add more research experiences as they become available
];

export default function Experience() {
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 pt-10">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-[#e6c384] text-4xl sm:text-5xl mb-12">experience</h1>
        <div className="space-y-6">
          {research.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <h2 className="text-[#e6c384] text-xl">{item.title}</h2>
                <span className="text-[#7c7c7c]">{item.date}</span>
              </div>
              {item.description && (
                <p className="text-[#7c7c7c] text-sm mt-2">{item.description}</p>
              )}
              {item.link && (
                <div className="mt-2">
                  <Link 
                    href={item.link}
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

