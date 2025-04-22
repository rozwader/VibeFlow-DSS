import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

const GRID_GAP = 16;
const SCREEN_WIDTH = Dimensions.get("window").width;
const HORIZONTAL_PADDING = 16;
const SECTION_VERTICAL_MARGIN = 28;
const SECTION_HORIZONTAL_PADDING = 14;

const placeholderUser = { display_name: "Użytkownik Testowy" };

const placeholderArtists = [
  {
    id: "1",
    name: "Artysta 1",
    images: [{ url: "https://placehold.co/120x120/7F00FF/FFF?text=Artysta+1" }],
    followers: { total: 12345 },
    popularity: 85,
    genres: ["pop", "rock"],
  },
  {
    id: "2",
    name: "Bardzo Długa Nazwa Artysty 2",
    images: [{ url: "https://placehold.co/120x120/AC46FE/FFF?text=Artysta+2" }],
    followers: { total: 987 },
    popularity: 70,
    genres: ["electronic"],
  },
  {
    id: "3",
    name: "Artysta 3",
    images: [{ url: "https://placehold.co/120x120/C47CFF/FFF?text=Artysta+3" }],
    followers: { total: 50000 },
    popularity: 90,
    genres: ["hip-hop", "rap"],
  },
  {
    id: "4",
    name: "Artysta 4",
    images: [{ url: "https://placehold.co/120x120/DDA7FF/000?text=Artysta+4" }],
    followers: { total: 100 },
    popularity: 50,
    genres: [],
  },
  {
    id: "5",
    name: "Artysta 5",
    images: [{ url: "https://placehold.co/120x120/7F00FF/FFF?text=Artysta+5" }],
    followers: { total: 6789 },
    popularity: 75,
    genres: ["indie"],
  },
];

const placeholderTracks = [
  {
    id: "t1",
    name: "Nazwa Utworu 1",
    uri: "spotify:track:placeholder1",
    artists: [{ id: "a1", name: "Artysta A" }],
    album: {
      images: [{ url: "https://placehold.co/60x60/AC46FE/FFF?text=U1" }],
    },
    duration_ms: 185000,
  },
  {
    id: "t2",
    name: "Bardzo Długa Nazwa Utworu, Która Może Się Nie Zmieścić 2",
    uri: "spotify:track:placeholder2",
    artists: [
      { id: "a2", name: "Artysta B" },
      { id: "a3", name: "Artysta C" },
    ],
    album: {
      images: [{ url: "https://placehold.co/60x60/7F00FF/FFF?text=U2" }],
    },
    duration_ms: 240000,
  },
  {
    id: "t3",
    name: "Utwór 3",
    uri: "spotify:track:placeholder3",
    artists: [{ id: "a4", name: "Artysta D" }],
    album: {
      images: [{ url: "https://placehold.co/60x60/C47CFF/FFF?text=U3" }],
    },
    duration_ms: 210000,
  },
  {
    id: "t4",
    name: "Krótki Utwór 4",
    uri: "spotify:track:placeholder4",
    artists: [{ id: "a1", name: "Artysta A" }],
    album: {
      images: [{ url: "https://placehold.co/60x60/DDA7FF/000?text=U4" }],
    },
    duration_ms: 150000,
  },
  {
    id: "t5",
    name: "Piąty Utwór Testowy",
    uri: "spotify:track:placeholder5",
    artists: [{ id: "a5", name: "Artysta E" }],
    album: {
      images: [{ url: "https://placehold.co/60x60/AC46FE/FFF?text=U5" }],
    },
    duration_ms: 200000,
  },
  {
    id: "t6",
    name: "Szósty Element",
    uri: "spotify:track:placeholder6",
    artists: [{ id: "a6", name: "Artysta F" }],
    album: {
      images: [{ url: "https://placehold.co/60x60/7F00FF/FFF?text=U6" }],
    },
    duration_ms: 195000,
  },
];

const placeholderRecentTracks = [
  {
    track: {
      id: "r1",
      name: "Ostatnio Odtwarzany 1",
      uri: "spotify:track:placeholder_r1",
      artists: [{ id: "a5", name: "Artysta E" }],
      album: {
        images: [{ url: "https://placehold.co/60x60/DDA7FF/000?text=R1" }],
      },
      duration_ms: 190000,
    },
    played_at: "2025-04-21T12:10:00Z",
  },
  {
    track: {
      id: "r2",
      name: "Ostatnio Odtwarzany 2",
      uri: "spotify:track:placeholder_r2",
      artists: [{ id: "a6", name: "Artysta F" }],
      album: {
        images: [{ url: "https://placehold.co/60x60/AC46FE/FFF?text=R2" }],
      },
      duration_ms: 220000,
    },
    played_at: "2025-04-21T12:05:00Z",
  },
  {
    track: {
      id: "r3",
      name: "Jeszcze Inny Ostatni Utwór",
      uri: "spotify:track:placeholder_r3",
      artists: [{ id: "a7", name: "Artysta G" }],
      album: {
        images: [{ url: "https://placehold.co/60x60/7F00FF/FFF?text=R3" }],
      },
      duration_ms: 180000,
    },
    played_at: "2025-04-21T12:00:00Z",
  },
];

const placeholderPlaylists = [
  {
    id: "p1",
    name: "Playlista Pierwsza",
    images: [{ url: "https://placehold.co/150x150/7F00FF/FFF?text=Lista+1" }],
    tracks: { total: 25 },
    owner: { display_name: "SpotifyUser" },
  },
  {
    id: "p2",
    name: "Ulubione z Wakacji",
    images: [{ url: "https://placehold.co/150x150/AC46FE/FFF?text=Lista+2" }],
    tracks: { total: 10 },
    owner: { display_name: "Ja" },
  },
  {
    id: "p3",
    name: "Do Biegania",
    images: [{ url: "https://placehold.co/150x150/C47CFF/FFF?text=Lista+3" }],
    tracks: { total: 50 },
    owner: { display_name: "Ktoś Inny" },
  },
  {
    id: "p4",
    name: "Wieczorny Chillout",
    images: [{ url: "https://placehold.co/150x150/DDA7FF/000?text=Lista+4" }],
    tracks: { total: 15 },
    owner: { display_name: "Ja" },
  },
  {
    id: "p5",
    name: "Rockowe Hity",
    images: [{ url: "https://placehold.co/150x150/7F00FF/FFF?text=Lista+5" }],
    tracks: { total: 40 },
    owner: { display_name: "RockFan" },
  },
  {
    id: "p6",
    name: "Klasyki Lat 90",
    images: [{ url: "https://placehold.co/150x150/AC46FE/FFF?text=Lista+6" }],
    tracks: { total: 30 },
    owner: { display_name: "Nostalgik" },
  },
];

const placeholderAlbums = [
  {
    id: "alb1",
    name: "Nazwa Albumu 1",
    images: [{ url: "https://placehold.co/150x150/7F00FF/FFF?text=Album+1" }],
    artists: [{ id: "a1", name: "Artysta A" }],
    total_tracks: 12,
    release_date: "2023-10-20",
  },
  {
    id: "alb2",
    name: "Album Drugi (Single)",
    images: [{ url: "https://placehold.co/150x150/AC46FE/FFF?text=Album+2" }],
    artists: [{ id: "a2", name: "Artysta B" }],
    total_tracks: 1,
    release_date: "2024-01-15",
  },
  {
    id: "alb3",
    name: "Kompilacja Hitów",
    images: [{ url: "https://placehold.co/150x150/C47CFF/FFF?text=Album+3" }],
    artists: [
      { id: "a1", name: "Artysta A" },
      { id: "a2", name: "Artysta B" },
    ],
    total_tracks: 20,
    release_date: "2022-05-01",
  },
  {
    id: "alb4",
    name: "Nowy Album Czwarty",
    images: [{ url: "https://placehold.co/150x150/DDA7FF/000?text=Album+4" }],
    artists: [{ id: "a3", name: "Artysta C" }],
    total_tracks: 10,
    release_date: "2024-04-10",
  },
  {
    id: "alb5",
    name: "Akustycznie",
    images: [{ url: "https://placehold.co/150x150/7F00FF/FFF?text=Album+5" }],
    artists: [{ id: "a4", name: "Artysta D" }],
    total_tracks: 8,
    release_date: "2023-08-01",
  },
];

const placeholderSavedAlbums = placeholderAlbums
  .slice(0, 3)
  .map((a) => ({ album: a }));
const placeholderNewAlbums = placeholderAlbums.slice(3, 5);

const placeholderCommunityPlaylists = [
  {
    id: "cp1",
    name: "Playlista Społeczności 1",
    creator: "User123",
    tracks: [
      {
        id: "f1",
        name: "Plik 1",
        fileName: "plik1.mp3",
        creator: "User123",
        artist: "Artysta Pliku 1",
      },
      {
        id: "f2",
        name: "Plik 2",
        fileName: "plik2.mp3",
        creator: "InnyUser",
        artist: "",
      },
    ],
  },
  {
    id: "cp2",
    name: "Najlepsze Uploady",
    creator: "Admin",
    tracks: [
      {
        id: "f3",
        name: "Plik 3",
        fileName: "plik3.mp3",
        creator: "User456",
        artist: "Znany Artysta",
      },
    ],
  },
];

const placeholderUserPlaylists = [
  {
    id: "up1",
    name: "Moja Playlista 1",
    creator: placeholderUser.display_name,
    tracks: [
      {
        id: "f1",
        name: "Plik 1",
        fileName: "plik1.mp3",
        creator: placeholderUser.display_name,
        artist: "Artysta Pliku 1",
      },
    ],
  },
];

const placeholderUploadedFiles = [
  {
    id: "f1",
    name: "Plik 1",
    fileName: "plik1.mp3",
    creator: "User123",
    artist: "Artysta Pliku 1",
  },
  {
    id: "f2",
    name: "Plik 2",
    fileName: "plik2.mp3",
    creator: "InnyUser",
    artist: "",
  },
  {
    id: "f3",
    name: "Plik 3",
    fileName: "plik3.mp3",
    creator: "User456",
    artist: "Znany Artysta",
  },
  {
    id: "f4",
    name: "Mój Plik 4",
    fileName: "plik4.mp3",
    creator: placeholderUser.display_name,
    artist: "Ja",
  },
];

const placeholderUserFiles = placeholderUploadedFiles.filter(
  (f) => f.creator === placeholderUser.display_name
);

const placeholderCurrentTrack = {
  name: "Aktualnie Grany Utwór",
  artists: [{ name: "Wykonawca Utworu" }],
  album: { images: [{ url: "https://placehold.co/64x64/333/ccc?text=?" }] },
  duration_ms: 215000,
};

const formatTime = (ms) => {
  if (!ms || ms < 0) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const PlayButton = ({ trackUri }) => {
  const handlePlay = () => console.log("Play:", trackUri);
  return (
    <TouchableOpacity onPress={handlePlay} style={styles.playButton}>
      <FontAwesome name="play" size={14} color="#fff" />
    </TouchableOpacity>
  );
};

const TrackListItemNumbered = ({
  item,
  index,
  onArtistPress,
  showDuration = true,
  isAlbum = false,
}) => {
  const track = isAlbum ? item : item.track;
  if (!track) return null;

  return (
    <View style={styles.trackItemNumbered}>
      <Text style={styles.trackNumber}>{index + 1}</Text>
      <View style={styles.trackInfoContainerNumbered}>
        {!isAlbum && track.album?.images?.[0]?.url && (
          <Image
            source={{ uri: track.album.images[0].url }}
            style={styles.trackImageSmall}
            onError={(e) =>
              console.log("Image load error:", e.nativeEvent.error)
            }
          />
        )}
        <View style={styles.trackTextContainer}>
          <Text style={styles.trackName} numberOfLines={1}>
            {track.name}
          </Text>
          <Text style={styles.trackArtist} numberOfLines={1}>
            {track.artists?.map((artist, idx) => (
              <Text key={artist.id} onPress={() => onArtistPress(artist.id)}>
                {artist.name}
                {idx < track.artists.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>
        </View>
      </View>
      {showDuration && (
        <Text style={styles.trackDuration}>
          {formatTime(track.duration_ms)}
        </Text>
      )}
      <PlayButton trackUri={track.uri} />
    </View>
  );
};

const TrackList = ({ tracks, onArtistPress, isAlbum = false }) => {
  if (!tracks || tracks.length === 0) {
    return (
      <Text style={styles.loadingText}>Brak utworów do wyświetlenia.</Text>
    );
  }
  return (
    <View style={styles.trackListContainer}>
      {tracks.map((item, index) => (
        <TrackListItemNumbered
          key={isAlbum ? item.id : `${item.track?.id || "track"}-${index}`}
          item={item}
          index={index}
          onArtistPress={onArtistPress}
          isAlbum={isAlbum}
        />
      ))}
    </View>
  );
};

const TopArtistsComponent = ({ topArtists, onArtistPress }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>Twoi Topowi Artyści</Text>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalScroll}
    >
      {topArtists.map((artist) => (
        <TouchableOpacity
          key={artist.id}
          style={styles.artistItem}
          onPress={() => onArtistPress(artist.id)}
        >
          <Image
            source={{
              uri:
                artist.images[0]?.url ||
                "https://placehold.co/100x100/eee/ccc?text=Brak",
            }}
            style={styles.artistImage}
            onError={(e) =>
              console.log("Image load error:", e.nativeEvent.error)
            }
          />
          <Text style={styles.artistName} numberOfLines={2}>
            {artist.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const TrackListItemWithImage = ({ item, onArtistPress }) => {
  const track = item.track || item;
  const imageUrl =
    track.album?.images?.[0]?.url ||
    "https://placehold.co/60x60/eee/ccc?text=?";

  return (
    <View style={styles.trackItem}>
      <View style={styles.trackInfoContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.trackImage}
          onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
        />
        <View style={styles.trackTextContainer}>
          <Text style={styles.trackName} numberOfLines={1}>
            {track.name}
          </Text>
          <Text style={styles.trackArtist} numberOfLines={1}>
            {track.artists?.map((artist, index) => (
              <Text key={artist.id} onPress={() => onArtistPress(artist.id)}>
                {artist.name}
                {index < track.artists.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>
        </View>
      </View>
      <PlayButton trackUri={track.uri} />
    </View>
  );
};

const TopTracksComponent = ({ topTracks, onArtistPress }) => (
  <View style={[styles.sectionContainer, styles.listSection]}>
    <Text style={styles.sectionTitle}>Twoje Topowe Utwory</Text>
    {topTracks.length > 0 ? (
      topTracks.map((item) => (
        <TrackListItemWithImage
          key={item.id}
          item={item}
          onArtistPress={onArtistPress}
        />
      ))
    ) : (
      <Text style={styles.loadingText}>Brak danych.</Text>
    )}
  </View>
);

const RecentlyPlayedComponent = ({ recentTracks, onArtistPress }) => (
  <View style={[styles.sectionContainer, styles.listSection]}>
    <Text style={styles.sectionTitle}>Ostatnio Odtwarzane</Text>
    {recentTracks.length > 0 ? (
      recentTracks.map((item, index) => (
        <TrackListItemWithImage
          key={`${item.track.id}-${index}`}
          item={item}
          onArtistPress={onArtistPress}
        />
      ))
    ) : (
      <Text style={styles.loadingText}>Brak danych.</Text>
    )}
  </View>
);

const VerticalListComponent = ({
  items,
  onItemPress,
  onArtistPress,
  title,
  type,
}) => {
  return (
    <View style={styles.sectionContainer}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      <View style={styles.verticalListContainer}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.verticalListItem}
            onPress={() => onItemPress(item.id)}
          >
            <Image
              source={{
                uri:
                  item.images[0]?.url ||
                  "https://placehold.co/80x80/eee/ccc?text=Brak",
              }}
              style={styles.verticalListItemImage}
              onError={(e) =>
                console.log("Image load error:", e.nativeEvent.error)
              }
            />
            <View style={styles.verticalListItemTextContainer}>
              <Text style={styles.verticalListItemName} numberOfLines={1}>
                {item.name}
              </Text>
              {type === "playlist" && (
                <Text style={styles.verticalListItemSubText}>
                  <Text>{item.tracks.total}</Text>
                  <Text> utworów</Text>
                </Text>
              )}
              {type === "album" && (
                <>
                  <Text
                    style={styles.verticalListItemSubText}
                    numberOfLines={1}
                  >
                    {item.artists?.map((artist, index) => (
                      <Text
                        key={artist.id}
                        onPress={(e) => {
                          e.stopPropagation(); // Prevent triggering onItemPress
                          onArtistPress(artist.id);
                        }}
                      >
                        {artist.name}
                        {index < item.artists.length - 1 ? ", " : ""}
                      </Text>
                    ))}
                  </Text>
                  <Text style={styles.verticalListItemSubText}>
                    <Text>{new Date(item.release_date).getFullYear()}</Text>
                    <Text> • </Text>
                    <Text>{item.total_tracks}</Text>
                    <Text> utworów</Text>
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const HorizontalAlbumComponent = ({
  albums,
  onAlbumPress,
  onArtistPress,
  title,
}) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalScroll}
    >
      {albums.map((item) => {
        const album = item.album || item;
        return (
          <TouchableOpacity
            key={album.id}
            style={styles.horizontalAlbumItem}
            onPress={() => onAlbumPress(album.id)}
          >
            <Image
              source={{
                uri:
                  album.images[0]?.url ||
                  "https://placehold.co/150x150/eee/ccc?text=Brak",
              }}
              style={styles.horizontalAlbumImage}
              onError={(e) =>
                console.log("Image load error:", e.nativeEvent.error)
              }
            />
            <Text style={styles.horizontalAlbumName} numberOfLines={1}>
              {album.name}
            </Text>
            <Text style={styles.horizontalAlbumArtist} numberOfLines={1}>
              {album.artists?.map((artist, index) => (
                <Text
                  key={artist.id}
                  onPress={(e) => {
                    e.stopPropagation(); // Prevent triggering onAlbumPress
                    onArtistPress(artist.id);
                  }}
                >
                  {artist.name}
                  {index < album.artists.length - 1 ? ", " : ""}
                </Text>
              ))}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </View>
);

const UploadedFileItem = ({ file }) => (
  <View style={styles.fileItem}>
    <Text style={styles.fileName}>{file.name}</Text>
    <Text style={styles.fileDetails}>
      <Text>Artysta: </Text>
      <Text>{file.artist || "Nieznany"}</Text>
    </Text>
    <Text style={styles.fileDetails}>
      <Text>Dodał: </Text>
      <Text>{file.creator}</Text>
    </Text>
    <TouchableOpacity style={styles.audioPlaceholder}>
      <FontAwesome name="play-circle" size={20} color="#8A2BE2" />
      <Text style={styles.audioPlaceholderText}> Odtwórz</Text>
    </TouchableOpacity>
  </View>
);

const CreatePlaylistComponent = () => (
  <View style={styles.createPlaylistContainer}>
    <Text style={styles.sectionTitle}>Stwórz Playlistę VibeFlow</Text>
    <TextInput
      placeholder="Nazwa playlisty"
      style={styles.input}
      placeholderTextColor="#999"
    />
    <TouchableOpacity style={styles.button}>
      <Ionicons name="add" size={20} color="#fff" />
      <Text style={styles.buttonText}> Stwórz</Text>
    </TouchableOpacity>
  </View>
);

const VibeFlowPlaylistItem = ({ playlist }) => (
  <View style={styles.vibeFlowPlaylist}>
    <Text style={styles.vibeFlowPlaylistTitle}>{playlist.name}</Text>
    <Text style={styles.vibeFlowPlaylistCreator}>
      <Text>Stworzona przez: </Text>
      <Text>{playlist.creator}</Text>
    </Text>
    <View style={styles.vibeFlowTrackList}>
      <Text style={styles.vibeFlowSectionTitle}>Utwory:</Text>
      {playlist.tracks.length > 0 ? (
        playlist.tracks.map((track) => (
          <UploadedFileItem key={track.id} file={track} />
        ))
      ) : (
        <Text style={styles.loadingText}>Ta playlista jest pusta.</Text>
      )}
    </View>
  </View>
);

const HomeView = ({ onArtistPress, onPlaylistPress }) => (
  <ScrollView
    contentContainerStyle={styles.scrollContentContainer}
    showsVerticalScrollIndicator={false}
  >
    <TopArtistsComponent
      topArtists={placeholderArtists}
      onArtistPress={onArtistPress}
    />
    <TopTracksComponent
      topTracks={placeholderTracks.slice(0, 5)}
      onArtistPress={onArtistPress}
    />
    <RecentlyPlayedComponent
      recentTracks={placeholderRecentTracks.slice(0, 5)}
      onArtistPress={onArtistPress}
    />
    <VerticalListComponent
      items={placeholderPlaylists.slice(0, 4)}
      onItemPress={onPlaylistPress}
      title="Twoje Playlisty Spotify"
      type="playlist"
    />
  </ScrollView>
);

const PlaylistsView = ({ onPlaylistPress }) => (
  <ScrollView
    contentContainerStyle={styles.scrollContentContainer}
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.viewTitle}>Playlisty Spotify</Text>
    <VerticalListComponent
      items={placeholderPlaylists}
      onItemPress={onPlaylistPress}
      title=""
      type="playlist"
    />
  </ScrollView>
);

const AlbumsView = ({ onAlbumPress, onArtistPress }) => (
  <ScrollView
    contentContainerStyle={styles.scrollContentContainer}
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.viewTitle}>Albumy Spotify</Text>
    <HorizontalAlbumComponent
      albums={placeholderNewAlbums}
      onAlbumPress={onAlbumPress}
      onArtistPress={onArtistPress}
      title="Nowe Wydania"
    />
    <HorizontalAlbumComponent
      albums={placeholderSavedAlbums}
      onAlbumPress={onAlbumPress}
      onArtistPress={onArtistPress}
      title="Zapisane Albumy"
    />
    <VerticalListComponent
      items={placeholderAlbums}
      onItemPress={onAlbumPress}
      onArtistPress={onArtistPress}
      title="Wszystkie Albumy"
      type="album"
    />
  </ScrollView>
);

const FavoritesView = ({ onArtistPress }) => (
  <ScrollView
    contentContainerStyle={styles.scrollContentContainer}
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.viewTitle}>Ulubione Utwory Spotify</Text>
    <View style={styles.sectionContainer}>
      {placeholderTracks.length > 0 ? (
        placeholderTracks.map((item) => (
          <TrackListItemWithImage
            key={item.id}
            item={item}
            onArtistPress={onArtistPress}
          />
        ))
      ) : (
        <Text style={styles.loadingText}>Brak ulubionych utworów.</Text>
      )}
    </View>
  </ScrollView>
);

const ArtistView = ({ onAlbumPress, onArtistPress }) => {
  const artist = placeholderArtists[0];
  const albums = placeholderAlbums.slice(0, 4);
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.detailHeaderArtist}>
        <Image
          source={{
            uri:
              artist.images[0]?.url ||
              "https://placehold.co/120x120/eee/ccc?text=?",
          }}
          style={styles.detailImageLargeCircular}
          onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
        />
        <View style={styles.detailHeaderTextContainer}>
          <Text style={styles.detailTitle} numberOfLines={2}>
            {artist.name}
          </Text>
          <Text style={styles.detailSubtitle}>
            <Text>{artist.followers.total.toLocaleString()}</Text>
            <Text> followers</Text>
          </Text>
          <Text style={styles.detailSubtitle}>
            <Text>Popularity: </Text>
            <Text>{artist.popularity}</Text>
            <Text>%</Text>
          </Text>
          <View style={styles.genreContainer}>
            {artist.genres.map((genre, index) => (
              <View key={index} style={styles.genreBadge}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <VerticalListComponent
        items={albums}
        onItemPress={onAlbumPress}
        onArtistPress={onArtistPress}
        title="Dyskografia"
        type="album"
      />
    </ScrollView>
  );
};

const AlbumView = ({ onArtistPress }) => {
  const album = placeholderAlbums[0];
  const tracks = placeholderTracks;
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.detailHeader}>
        <Image
          source={{
            uri:
              album.images[0]?.url ||
              "https://placehold.co/120x120/eee/ccc?text=?",
          }}
          style={styles.detailImageLargeSquare}
          onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
        />
        <View style={styles.detailHeaderTextContainerAlbum}>
          <Text style={styles.detailTitle} numberOfLines={2}>
            {album.name}
          </Text>
          <Text style={styles.detailSubtitle} numberOfLines={1}>
            {album.artists?.map((artist, index) => (
              <Text key={artist.id} onPress={() => onArtistPress(artist.id)}>
                {artist.name}
                {index < album.artists.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>
          <Text style={styles.detailSubtitle}>
            <Text>{new Date(album.release_date).getFullYear()}</Text>
            <Text> • </Text>
            <Text>{album.total_tracks}</Text>
            <Text> utworów</Text>
          </Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Utwory</Text>
        <TrackList
          tracks={tracks}
          onArtistPress={onArtistPress}
          isAlbum={true}
        />
      </View>
    </ScrollView>
  );
};

const PlaylistView = ({ onArtistPress }) => {
  const playlist = placeholderPlaylists[0];
  const tracks = placeholderTracks.slice(0, 15).map((track) => ({ track }));
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.detailHeader}>
        <Image
          source={{
            uri:
              playlist.images[0]?.url ||
              "https://placehold.co/120x120/eee/ccc?text=?",
          }}
          style={styles.detailImageLargeSquare}
          onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
        />
        <View style={styles.detailHeaderTextContainerAlbum}>
          <Text style={styles.detailTitle} numberOfLines={2}>
            {playlist.name}
          </Text>
          <Text style={styles.detailSubtitle}>
            <Text>Właściciel: </Text>
            <Text>{playlist.owner.display_name}</Text>
          </Text>
          <Text style={styles.detailSubtitle}>
            <Text>{playlist.tracks.total}</Text>
            <Text> utworów</Text>
          </Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Utwory</Text>
        <TrackList
          tracks={tracks}
          onArtistPress={onArtistPress}
          isAlbum={false}
        />
      </View>
    </ScrollView>
  );
};

const SearchView = ({ onArtistPress, onAlbumPress, onPlaylistPress }) => (
  <View style={styles.searchContainer}>
    <View style={styles.searchBarContainer}>
      <Ionicons
        name="search"
        size={20}
        color="#888"
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Utwory, artyści, albumy..."
        style={styles.searchInput}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Szukaj</Text>
      </TouchableOpacity>
    </View>
    <ScrollView
      contentContainerStyle={styles.searchResultsContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.viewTitle}>Wyniki Wyszukiwania</Text>
      <TopTracksComponent
        topTracks={placeholderTracks.slice(0, 3)}
        onArtistPress={onArtistPress}
      />
      <TopArtistsComponent
        topArtists={placeholderArtists.slice(0, 3)}
        onArtistPress={onArtistPress}
      />
      <VerticalListComponent
        items={placeholderAlbums.slice(0, 2)}
        onItemPress={onAlbumPress}
        onArtistPress={onArtistPress}
        title="Znalezione Albumy"
        type="album"
      />
      <VerticalListComponent
        items={placeholderPlaylists.slice(0, 2)}
        onItemPress={onPlaylistPress}
        title="Znalezione Playlisty"
        type="playlist"
      />
    </ScrollView>
  </View>
);

const UploadView = () => (
  <ScrollView
    contentContainerStyle={styles.scrollContentContainer}
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.viewTitle}>Wgraj Plik VibeFlow</Text>
    <View style={styles.sectionContainer}>
      <TextInput
        placeholder="Nazwa utworu"
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Artysta (opcjonalnie)"
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={[styles.button, styles.uploadButton]}>
        <MaterialIcons name="cloud-upload" size={20} color="#fff" />
        <Text style={styles.buttonText}> Wybierz plik MP3</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Wgraj</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const FilesView = () => (
  <ScrollView
    contentContainerStyle={styles.scrollContentContainer}
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.viewTitle}>Pliki Społeczności VibeFlow</Text>
    <View style={styles.sectionContainer}>
      {placeholderUploadedFiles.length > 0 ? (
        placeholderUploadedFiles.map((file) => (
          <UploadedFileItem key={file.id} file={file} />
        ))
      ) : (
        <Text style={styles.loadingText}>Brak wgranych plików.</Text>
      )}
    </View>
  </ScrollView>
);

const UserFilesView = () => (
  <ScrollView
    contentContainerStyle={styles.scrollContentContainer}
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.viewTitle}>Twoje Pliki VibeFlow</Text>
    <View style={styles.sectionContainer}>
      {placeholderUserFiles.length > 0 ? (
        placeholderUserFiles.map((file) => (
          <UploadedFileItem key={file.id} file={file} />
        ))
      ) : (
        <Text style={styles.loadingText}>
          Nie wgrałeś jeszcze żadnych plików.
        </Text>
      )}
    </View>
  </ScrollView>
);

const CommunityPlaylistsView = () => (
  <ScrollView
    contentContainerStyle={styles.scrollContentContainer}
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.viewTitle}>Playlisty Społeczności VibeFlow</Text>
    <CreatePlaylistComponent />
    {placeholderCommunityPlaylists.length > 0 ? (
      placeholderCommunityPlaylists.map((playlist) => (
        <VibeFlowPlaylistItem key={playlist.id} playlist={playlist} />
      ))
    ) : (
      <Text style={styles.loadingText}>Brak playlist społeczności.</Text>
    )}
  </ScrollView>
);

const UserPlaylistsView = () => (
  <ScrollView
    contentContainerStyle={styles.scrollContentContainer}
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.viewTitle}>Twoje Playlisty VibeFlow</Text>
    <CreatePlaylistComponent />
    {placeholderUserPlaylists.length > 0 ? (
      placeholderUserPlaylists.map((playlist) => (
        <VibeFlowPlaylistItem key={playlist.id} playlist={playlist} />
      ))
    ) : (
      <Text style={styles.loadingText}>
        Nie stworzyłeś jeszcze żadnych playlist.
      </Text>
    )}
  </ScrollView>
);

const SettingsView = () => (
  <ScrollView
    contentContainerStyle={styles.scrollContentContainer}
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.viewTitle}>Ustawienia</Text>
    <View style={styles.sectionContainer}>
      <TouchableOpacity style={styles.settingsItem}>
        <Ionicons name="person-circle-outline" size={24} color="#555" />
        <Text style={styles.settingsText}>Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsItem}>
        <Ionicons name="notifications-outline" size={24} color="#555" />
        <Text style={styles.settingsText}>Powiadomienia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsItem}>
        <Ionicons name="lock-closed-outline" size={24} color="#555" />
        <Text style={styles.settingsText}>Prywatność</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.logoutButton]}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}> Wyloguj</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const CurrentSongInfo = ({ track }) => (
  <View style={styles.currentSongContainer}>
    <Image
      source={{
        uri:
          track.album.images[0]?.url ||
          "https://placehold.co/64x64/333/ccc?text=?",
      }}
      style={styles.currentSongImage}
      onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
    />
    <View style={styles.currentSongTextContainer}>
      <Text style={styles.currentSongName} numberOfLines={1}>
        {track.name || "Brak utworu"}
      </Text>
      <Text style={styles.currentSongArtist} numberOfLines={1}>
        {track.artists?.map((a) => a.name).join(", ") || "Nieznany wykonawca"}
      </Text>
    </View>
  </View>
);

const MusicSlider = ({ duration = 200000, time = 50000 }) => (
  <View style={styles.sliderContainer}>
    <Text style={styles.timeText}>{formatTime(time)}</Text>
    <View style={styles.sliderTrack}>
      <View
        style={[
          styles.sliderProgress,
          { width: `${Math.min(100, (time / (duration || 1)) * 100)}%` },
        ]}
      />
    </View>
    <Text style={styles.timeText}>{formatTime(duration)}</Text>
  </View>
);

const SongControls = ({ paused = true }) => (
  <View style={styles.controlsContainer}>
    <TouchableOpacity style={styles.controlButton}>
      <Ionicons name="play-skip-back" size={26} color="#eee" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.playPauseButton}>
      <Ionicons name={paused ? "play" : "pause"} size={28} color="#000" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.controlButton}>
      <Ionicons name="play-skip-forward" size={26} color="#eee" />
    </TouchableOpacity>
  </View>
);

const VolumeControl = () => (
  <View style={styles.volumeContainer}>
    <Ionicons name="volume-medium" size={20} color="#ccc" />
    <View style={styles.volumeSliderTrack}>
      <View style={[styles.volumeSliderProgress, { width: "50%" }]} />
    </View>
  </View>
);

export default function MusicScreen() {
  const [activeView, setActiveView] = useState("home");
  const [currentTime, setCurrentTime] = useState(50000);

  const handleArtistPress = (artistId) => {
    console.log("Navigate to Artist:", artistId);
    setActiveView("artist");
  };
  const handlePlaylistPress = (playlistId) => {
    console.log("Navigate to Playlist:", playlistId);
    setActiveView("playlist");
  };
  const handleAlbumPress = (albumId) => {
    console.log("Navigate to Album:", albumId);
    setActiveView("album");
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "home":
        return (
          <HomeView
            onArtistPress={handleArtistPress}
            onPlaylistPress={handlePlaylistPress}
          />
        );
      case "playlists":
        return <PlaylistsView onPlaylistPress={handlePlaylistPress} />;
      case "albums":
        return (
          <AlbumsView
            onAlbumPress={handleAlbumPress}
            onArtistPress={handleArtistPress}
          />
        );
      case "favorites":
        return <FavoritesView onArtistPress={handleArtistPress} />;
      case "search":
        return (
          <SearchView
            onArtistPress={handleArtistPress}
            onAlbumPress={handleAlbumPress}
            onPlaylistPress={handlePlaylistPress}
          />
        );
      case "upload":
        return <UploadView />;
      case "files":
        return <FilesView />;
      case "userfiles":
        return <UserFilesView />;
      case "communityplaylists":
        return <CommunityPlaylistsView />;
      case "userplaylists":
        return <UserPlaylistsView />;
      case "settings":
        return <SettingsView />;
      case "artist":
        return (
          <ArtistView
            onAlbumPress={handleAlbumPress}
            onArtistPress={handleArtistPress}
          />
        );
      case "album":
        return <AlbumView onArtistPress={handleArtistPress} />;
      case "playlist":
        return <PlaylistView onArtistPress={handleArtistPress} />;
      default:
        return (
          <HomeView
            onArtistPress={handleArtistPress}
            onPlaylistPress={handlePlaylistPress}
          />
        );
    }
  };

  const menuItems = [
    { key: "home", label: "Home", icon: "home-outline" },
    { key: "search", label: "Szukaj", icon: "search-outline" },
    { key: "playlists", label: "Playlisty S", icon: "list-outline" },
    { key: "albums", label: "Albumy S", icon: "albums-outline" },
    { key: "favorites", label: "Ulubione S", icon: "heart-outline" },
    { key: "files", label: "Pliki Com", icon: "folder-open-outline" },
    { key: "userfiles", label: "Moje Pliki", icon: "folder-outline" },
    {
      key: "communityplaylists",
      label: "Playlisty Com",
      icon: "people-outline",
    },
    { key: "userplaylists", label: "Moje Playlisty", icon: "person-outline" },
    { key: "upload", label: "Wgraj", icon: "cloud-upload-outline" },
    { key: "settings", label: "Ustawienia", icon: "settings-outline" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navigationContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navigationScroll}
        >
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.navButton,
                activeView === item.key && styles.navButtonActive,
              ]}
              onPress={() => setActiveView(item.key)}
            >
              <Ionicons
                name={item.icon}
                size={18}
                color={activeView === item.key ? "#fff" : "#8A2BE2"}
              />
              <Text
                style={[
                  styles.navButtonText,
                  activeView === item.key && styles.navButtonTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.contentArea}>{renderActiveView()}</View>

      <View style={styles.musicPlayerContainer}>
        <View style={styles.musicPlayerTopRow}>
          <CurrentSongInfo track={placeholderCurrentTrack} />
          <SongControls paused={true} />
        </View>
        <View style={styles.musicPlayerBottomRow}>
          <MusicSlider
            duration={placeholderCurrentTrack.duration_ms}
            time={currentTime}
          />
          <VolumeControl />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  navigationContainer: {
    height: 55,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    justifyContent: "center",
    paddingVertical: 5,
    marginTop: Platform.select({
      android: 24,
      default: 0,
    }),
  },
  navigationScroll: {
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_PADDING / 2,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginHorizontal: 4,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f8f9fa",
  },
  navButtonActive: {
    backgroundColor: "#8A2BE2",
    borderColor: "#8A2BE2",
  },
  navButtonText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "500",
    color: "#555",
  },
  navButtonTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },
  contentArea: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  scrollContentContainer: {
    padding: HORIZONTAL_PADDING,
    paddingBottom: SECTION_VERTICAL_MARGIN,
  },
  viewTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 24,
    marginLeft: 4,
  },
  sectionContainer: {
    marginBottom: SECTION_VERTICAL_MARGIN,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: SECTION_HORIZONTAL_PADDING,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  listSection: {
    paddingBottom: 0,
    paddingTop: SECTION_HORIZONTAL_PADDING,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 16,
    marginLeft: 4,
  },
  horizontalScroll: {
    paddingBottom: 8,
  },
  artistItem: {
    marginRight: 16,
    alignItems: "center",
    width: 100,
  },
  artistImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 8,
    backgroundColor: "#e0e0e0",
  },
  artistName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#34495e",
    textAlign: "center",
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingHorizontal: 4,
  },
  trackInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
    overflow: "hidden",
  },
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 14,
    backgroundColor: "#e0e0e0",
  },
  trackImageSmall: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 14,
    backgroundColor: "#e0e0e0",
  },
  trackTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  trackName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 2,
  },
  trackArtist: {
    fontSize: 13,
    color: "#7f8c8d",
  },
  trackListContainer: {},
  trackItemNumbered: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingHorizontal: 4,
  },
  trackNumber: {
    width: 35,
    textAlign: "center",
    color: "#95a5a6",
    fontSize: 14,
  },
  trackInfoContainerNumbered: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
    overflow: "hidden",
  },
  trackDuration: {
    width: 50,
    textAlign: "right",
    color: "#95a5a6",
    fontSize: 13,
    marginLeft: 10,
  },
  playButton: {
    backgroundColor: "#8A2BE2",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },
  verticalListContainer: {},
  verticalListItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: GRID_GAP,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verticalListItemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: "#e0e0e0",
  },
  verticalListItemTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  verticalListItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 4,
  },
  verticalListItemSubText: {
    fontSize: 13,
    color: "#7f8c8d",
    marginBottom: 2,
  },
  playlistGrid: {},
  gridItem: {},
  gridItemImage: {},
  gridItemTextContainer: {},
  gridItemName: {},
  gridItemSubText: {},
  horizontalAlbumItem: {
    marginRight: 16,
    width: 150,
  },
  horizontalAlbumImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
  },
  horizontalAlbumName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 2,
  },
  horizontalAlbumArtist: {
    fontSize: 12,
    color: "#7f8c8d",
  },
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailHeaderArtist: {
    alignItems: "center",
    marginBottom: 30,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailImageLargeCircular: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
    backgroundColor: "#e0e0e0",
  },
  detailImageLargeSquare: {
    width: 130,
    height: 130,
    borderRadius: 10,
    marginRight: 20,
    backgroundColor: "#e0e0e0",
  },
  detailHeaderTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  detailHeaderTextContainerAlbum: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 6,
    textAlign: "center",
  },
  detailSubtitle: {
    fontSize: 15,
    color: "#7f8c8d",
    marginBottom: 4,
    textAlign: "center",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  genreBadge: {
    backgroundColor: "#ecf0f1",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    margin: 4,
  },
  genreText: {
    fontSize: 12,
    color: "#7f8c8d",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    marginVertical: 12,
    marginHorizontal: HORIZONTAL_PADDING,
    paddingHorizontal: 15,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
    paddingVertical: 0,
  },
  searchButton: {
    backgroundColor: "#8A2BE2",
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 16,
    marginLeft: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  searchResultsContainer: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: SECTION_VERTICAL_MARGIN,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 12,
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
  },
  uploadButton: {
    backgroundColor: "#27ae60",
    shadowColor: "#27ae60",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    marginTop: 24,
    shadowColor: "#e74c3c",
  },
  fileItem: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  fileName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 5,
  },
  fileDetails: {
    fontSize: 13,
    color: "#95a5a6",
    marginBottom: 3,
  },
  audioPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  audioPlaceholderText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#8A2BE2",
    fontWeight: "500",
  },
  createPlaylistContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  vibeFlowPlaylist: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 18,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  vibeFlowPlaylistTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 5,
  },
  vibeFlowPlaylistCreator: {
    fontSize: 14,
    color: "#95a5a6",
    marginBottom: 12,
  },
  vibeFlowTrackList: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  vibeFlowSectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#7f8c8d",
    marginBottom: 10,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingsText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#34495e",
  },
  loadingText: {
    fontSize: 15,
    color: "#95a5a6",
    paddingVertical: 20,
    textAlign: "center",
  },
  musicPlayerContainer: {
    height: 110,
    backgroundColor: "#000000",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: 10,
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 12,
  },
  musicPlayerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  musicPlayerBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currentSongContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  currentSongImage: {
    width: 52,
    height: 52,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: "#333",
  },
  currentSongTextContainer: {
    flex: 1,
  },
  currentSongName: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  currentSongArtist: {
    color: "#b0b0b0",
    fontSize: 13,
  },
  sliderContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  timeText: {
    color: "#b0b0b0",
    fontSize: 12,
    minWidth: 30,
    textAlign: "center",
  },
  sliderTrack: {
    flex: 1,
    height: 5,
    backgroundColor: "#444",
    borderRadius: 3,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  sliderProgress: {
    height: "100%",
    backgroundColor: "#8A2BE2",
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  controlButton: {
    padding: 8,
  },
  playPauseButton: {
    backgroundColor: "#ffffff",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 100,
  },
  volumeSliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "#444",
    borderRadius: 2,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  volumeSliderProgress: {
    height: "100%",
    backgroundColor: "#b0b0b0",
  },
});
