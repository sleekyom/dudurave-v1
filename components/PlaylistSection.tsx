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
              src="https://open.spotify.com/embed/playlist/1ccHm2bfFAqMAtY6G0sgrQ?utm_source=generator&theme=0"
              width="100%"
              height="352"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
          <div className="md:w-3/5 text-gray-300 space-y-4">
            <p>
              Dudurave presents a diverse collection of playlists showcasing the
              most innovative sounds from Africa and the Caribbean.
            </p>
            {/* <p>
              From the electric pulse of Tanzanian Singeli to the deep grooves of South
              African Amapiano and Gqom, our carefully curated selections highlight the
              evolution of electronic African music. Dive into the soulful world of Afro-House
              and Afro-Tech, or catch the infectious rhythms of Caribbean Dancehall, Reggae,
              and Soca.
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
};
