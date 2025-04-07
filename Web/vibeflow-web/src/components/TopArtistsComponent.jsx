const TopArtistsComponent = ({ topArtists }) => (
  <div className="shadow-md p-3">
    <h2 className="text-xl font-semibold mb-4">Your Top Artists</h2>
    <div className="flex gap-4 overflow-x-auto">
      {topArtists.map((artist) => (
        <div
          key={artist.id}
          className="min-w-[150px] flex flex-col items-center"
        >
          <img
            src={artist.images[0]?.url}
            alt={artist.name}
            className="w-32 h-32 object-cover rounded-full shadow-md"
          />
          <p className="text-sm mt-2 text-center">{artist.name}</p>
        </div>
      ))}
    </div>
  </div>
);

export default TopArtistsComponent;
