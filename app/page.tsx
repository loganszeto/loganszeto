export default function Home() {
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 pt-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="h-[200px]">
          <h1 className="text-[#e6c384] text-4xl sm:text-5xl mb-6">Logan Szeto</h1>

          <div className="text-gray-400 text-base sm:text-lg mb-1">
            Irvine, CA
          </div>

          <div className="text-gray-400 text-base sm:text-lg mb-1">
            Undergraduate @ UCI studying software engineering with a focus
          </div>

          <div className="text-gray-400 text-base sm:text-lg mb-4">
            in data and AI alignment.
          </div>
        </div>
      </div>
    </div>
  );
}
