const TopArtistsComponent = ({ topArtists }) => (
  <div className="shadow-md p-4">
    <h2 className="text-xl font-semibold mb-4">Your Top Artists</h2>
    <div className="flex gap-6 overflow-x-auto">
      {topArtists.map((artist) => (
        <div
          key={artist.id}
          className="min-w-[170px] flex flex-col items-center"
        >
          <img
            src={artist.images[0]?.url}
            alt={artist.name}
            className="w-50 h-50 object-cover rounded-[50%] shadow-md"
          />
          <p className="font-bold text-sm mt-2 text-center">{artist.name}</p>
        </div>
      ))}
    </div>
  </div>
);


export default TopArtistsComponent;
