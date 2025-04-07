const RecentlyPlayedComponent = ({ recentTracks }) => (
  <div className="shadow-md p-3">
    <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
    <ul className="space-y-2">
      {recentTracks.map(({ track }, idx) => (
        <li key={idx} className="flex items-center gap-4">
          <img
            src={track.album.images[0]?.url}
            alt={track.name}
            className="w-12 h-12 rounded"
          />
          <div>
            <p className="font-medium">{track.name}</p>
            <p className="text-sm text-gray-500">
              {track.artists.map((a) => a.name).join(", ")}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentlyPlayedComponent;
