export const PlaylistSection = () => {
  return (
    <section className="py-12 md:py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 md:mb-12">
          Dudurave Playlist
        </h2>
        <div className="md:flex md:space-x-12 items-start">
          <div className="md:w-2/5 mb-8 md:mb-0">
            <iframe
              style={{ borderRadius: "20px" }}
              src="https://open.spotify.com/embed/playlist/0r550oQRt6XiYpzmzuF2Rg?si=A0-QyOKKRyyU21WnnyR0ZA"
              width="100%"
              height="352"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
          <div className="md:w-3/5 text-gray-300 space-y-4">
            <p className="text-lg font-semibold mb-2">
              The Dudurave Sound Selection
            </p>
            <p>
              Welcome to your new source of auditory bliss. This isn't just a
              playlist; it's a carefully curated journey through good finds,
              brimming with lovely rhythms and undeniably pure vibes.
            </p>
            <p>Get ready to discover your next favorite track.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
