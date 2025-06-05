import Link from 'next/link';

export default function FillerPage() {
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 pt-10">
      <div className="max-w-7xl mx-auto w-full">
        <Link 
          href="/posts" 
          className="text-[#e6c384] hover:text-gray-400 transition-colors mb-6 inline-block"
        >
          ← Back to Posts
        </Link>
        
        <h1 className="text-[#e6c384] text-4xl sm:text-5xl mb-6">filler page</h1>
        
        <div className="space-y-8">
          <section>
            <p className="text-gray-400 text-base sm:text-lg">
              This is a filler page to demonstrate the layout and styling of the posts section. 
              Future posts will contain actual content and insights.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 