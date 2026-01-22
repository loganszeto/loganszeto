import ZotWeeContent from './ZotWeeContent';

export default function ZotHacksPage() {

  return (
    <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 pt-20 pb-20">
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="text-[#c8c8c8] text-5xl sm:text-6xl mb-4 font-normal">ZotWee</h1>
        <p className="text-[#969696] text-base mb-8">ZotHacks 2023</p>

        <div className="border-t border-[#2a2a2a] pt-8">
          <ZotWeeContent />
        </div>
      </div>
    </div>
  );
}
