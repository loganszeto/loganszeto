import Link from 'next/link';

interface Post {
  title: string;
  date: string;
  link?: string;
}

const posts: Post[] = [
  {
    title: "filler page",
    date: "2024-12-14",
    link: "/posts/filler-page"
  }
];

export default function Posts() {
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 pt-10">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-[#e6c384] text-4xl sm:text-5xl mb-12">posts</h1>
        <div className="space-y-6">
          {posts.map((post, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <h2 className="text-[#e6c384] text-xl">{post.title}</h2>
                <span className="text-[#7c7c7c]">{post.date}</span>
              </div>
              {post.link && (
                <div className="mt-2">
                  <Link 
                    href={post.link}
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