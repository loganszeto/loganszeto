import ZotWeeCarousel from './ZotWeeCarousel';

export default function ZotWeeContent() {
  return (
    <>
      <ZotWeeCarousel />

      <div className="mt-10 space-y-6 text-[#c8c8c8] text-base leading-relaxed">
        <p>
          ZotWee started from a very simple and very real problem. During an ICS 31
          lecture in PCB, I suddenly needed to find a bathroom but had no idea where
          the nearest one was. After talking with friends, I realized this was a
          common issue, especially for new students who are not yet familiar with
          campus. That moment led to the idea for ZotWee.
        </p>
        <p>
          ZotWee is a web application that helps students quickly find nearby
          gender-neutral bathrooms on campus. The app shows the user’s current
          location on a map and highlights all known gender-neutral restrooms with
          interactive markers. When a user clicks a button, ZotWee finds the closest
          bathroom and displays the most efficient walking route to get there. Each
          bathroom marker also includes additional details such as the exact room
          location and whether the restroom is ADA-compliant.
        </p>
        <p>
          We built ZotWee by first collecting and organizing campus restroom data
          into a JavaScript dataset. Using the Google Maps API and Google Directions
          API, we handled location tracking, map rendering, and walking route
          calculations. We added custom markers and pop-ups using HTML to clearly
          display bathroom information directly on the map. One of our biggest
          technical challenges was routing. We initially used Leaflet with satellite
          maps, but after many hours of work we discovered it did not support
          pedestrian paths. With limited time left, we switched to Google Maps and
          rewrote our routing logic to match the new API.
        </p>
        <p>
          Despite losing team members before the hackathon even began, I am most
          proud of how quickly we adapted and delivered a working product. ZotWee
          was my first real experience with front-end development and API
          integration, and it taught me how to debug unfamiliar systems and stay
          calm under time pressure. In the future, I would like to add user
          accounts, allow bathroom ratings, and expand the amount of information
          available for each restroom to make ZotWee even more helpful for the
          campus community.
        </p>
      </div>

      <div className="mt-10">
        <a
          href="https://zot-wee.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#c8c8c8] text-sm hover:opacity-80 transition-opacity"
        >
          Visit ZotWee
        </a>
      </div>
    </>
  );
}
