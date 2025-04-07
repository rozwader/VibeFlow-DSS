const PlaylistsComponent = ({ playlists }) => (
  <div className="shadow-md p-3">
    <h2 className="text-xl font-semibold mb-4">Your Playlists</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="flex flex-col">
          <img
            src={playlist.images[0]?.url}
            className="w-full h-40 object-cover rounded-lg shadow"
            alt={playlist.name}
          />
          <p className="mt-2 text-sm font-semibold truncate">{playlist.name}</p>
          <p className="text-xs text-gray-600">
            {playlist.tracks.total} tracks
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default PlaylistsComponent;
