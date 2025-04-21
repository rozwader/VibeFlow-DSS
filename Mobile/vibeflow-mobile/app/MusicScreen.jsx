import React from "react"; // Usunięto useState, useEffect, useCallback
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const placeholderUser = { display_name: "Użytkownik Testowy" };

const placeholderArtists = [
  {
    id: "1",
    name: "Artysta 1",
    images: [{ url: "https://placehold.co/100x100/7F00FF/FFF?text=Artysta+1" }],
  },
  {
    id: "2",
    name: "Bardzo Długa Nazwa Artysty 2",
    images: [{ url: "https://placehold.co/100x100/AC46FE/FFF?text=Artysta+2" }],
  },
  {
    id: "3",
    name: "Artysta 3",
    images: [{ url: "https://placehold.co/100x100/C47CFF/FFF?text=Artysta+3" }],
  },
  {
    id: "4",
    name: "Artysta 4",
    images: [{ url: "https://placehold.co/100x100/DDA7FF/000?text=Artysta+4" }],
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
  },
  {
    id: "t3",
    name: "Utwór 3",
    uri: "spotify:track:placeholder3",
    artists: [{ id: "a4", name: "Artysta D" }],
    album: {
      images: [{ url: "https://placehold.co/60x60/C47CFF/FFF?text=U3" }],
    },
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
    },
    played_at: "2025-04-21T12:05:00Z",
  },
];

const placeholderPlaylists = [
  {
    id: "p1",
    name: "Playlista Pierwsza",
    images: [{ url: "https://placehold.co/150x150/7F00FF/FFF?text=Lista+1" }],
    tracks: { total: 25 },
  },
  {
    id: "p2",
    name: "Ulubione z Wakacji",
    images: [{ url: "https://placehold.co/150x150/AC46FE/FFF?text=Lista+2" }],
    tracks: { total: 10 },
  },
  {
    id: "p3",
    name: "Do Biegania",
    images: [{ url: "https://placehold.co/150x150/C47CFF/FFF?text=Lista+3" }],
    tracks: { total: 50 },
  },
  {
    id: "p4",
    name: "Wieczorny Chillout",
    images: [{ url: "https://placehold.co/150x150/DDA7FF/000?text=Lista+4" }],
    tracks: { total: 15 },
  },
];

const PlayButton = ({ trackUri }) => {
  const handlePlay = () => {
    console.log("Próba odtworzenia URI:", trackUri);
  };
  return (
    <TouchableOpacity onPress={handlePlay} style={styles.playButton}>
      <FontAwesome name="play" size={14} color="#fff" />
    </TouchableOpacity>
  );
};

const TopArtistsComponent = ({ topArtists, onArtistPress }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Twoi Topowi Artyści</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
                  "https://placehold.co/100x100/eee/ccc?text=Brak+Obrazka",
              }}
              style={styles.artistImage}
            />
            <Text style={styles.artistName} numberOfLines={1}>
              {artist.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const TrackListItem = ({ item, onArtistPress }) => {
  const track = item.track || item;
  const imageUrl =
    track.album?.images?.[0]?.url ||
    "https://placehold.co/60x60/eee/ccc?text=Brak+Okładki";

  return (
    <View style={styles.trackItem}>
      <View style={styles.trackInfoContainer}>
        <Image source={{ uri: imageUrl }} style={styles.trackImage} />
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

const TopTracksComponent = ({ topTracks, onArtistPress }) => {
  return (
    <View style={[styles.sectionContainer, styles.listSection]}>
      <Text style={styles.sectionTitle}>Twoje Topowe Utwory</Text>
      <FlatList
        data={topTracks}
        renderItem={({ item }) => (
          <TrackListItem item={item} onArtistPress={onArtistPress} />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const RecentlyPlayedComponent = ({ recentTracks, onArtistPress }) => {
  return (
    <View style={[styles.sectionContainer, styles.listSection]}>
      <Text style={styles.sectionTitle}>Ostatnio Odtwarzane</Text>
      <FlatList
        data={recentTracks}
        renderItem={({ item, index }) => (
          <TrackListItem item={item} onArtistPress={onArtistPress} />
        )}
        keyExtractor={(item, index) =>
          `${item.track.id}-${index}-${item.played_at}`
        }
        scrollEnabled={false}
      />
    </View>
  );
};

const PlaylistsComponent = ({ playlists, onPlaylistPress }) => {
  const numColumns = 2;
  const itemWidth =
    (Dimensions.get("window").width - 32 - (numColumns - 1) * 16) / numColumns;

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Twoje Playlisty</Text>
      <View style={styles.playlistGrid}>
        {playlists.map((playlist) => (
          <TouchableOpacity
            key={playlist.id}
            style={[styles.playlistItem, { width: itemWidth }]}
            onPress={() => onPlaylistPress(playlist.id)}
          >
            <Image
              source={{
                uri:
                  playlist.images[0]?.url ||
                  "https://placehold.co/150x150/eee/ccc?text=Brak+Obrazka",
              }}
              style={styles.playlistImage}
            />
            <Text style={styles.playlistName} numberOfLines={1}>
              {playlist.name}
            </Text>
            <Text style={styles.playlistTracks}>
              {playlist.tracks.total} utworów
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default function MusicScreen() {
  const handleArtistPress = (artistId) => {
    console.log("Nawiguj do Artysty:", artistId);
  };

  const handlePlaylistPress = (playlistId) => {
    console.log("Nawiguj do Playlisty:", playlistId);
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <TopArtistsComponent
          topArtists={placeholderArtists}
          onArtistPress={handleArtistPress}
        />

        <View style={styles.tracksGrid}>
          <View style={styles.tracksGridColumn}>
            <TopTracksComponent
              topTracks={placeholderTracks}
              onArtistPress={handleArtistPress}
            />
          </View>
          <View style={styles.tracksGridColumn}>
            <RecentlyPlayedComponent
              recentTracks={placeholderRecentTracks}
              onArtistPress={handleArtistPress}
            />
          </View>
        </View>

        <PlaylistsComponent
          playlists={placeholderPlaylists}
          onPlaylistPress={handlePlaylistPress}
        />
      </ScrollView>
      <View style={styles.musicPlayerPlaceholder}>
        <Text>Kontrolki Odtwarzacza</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContentContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
  },
  sectionContainer: {
    marginBottom: 32,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  listSection: {
    // maxHeight: 400, // Opcjonalnie, jeśli potrzebne ograniczenie wysokości
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginBottom: 16,
  },
  artistItem: {
    marginRight: 16,
    alignItems: "center",
    width: 110,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
  artistName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#555",
    textAlign: "center",
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingRight: 5,
  },
  trackInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  trackImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  trackTextContainer: {
    flex: 1,
  },
  trackName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  trackArtist: {
    fontSize: 12,
    color: "#777",
  },
  playButton: {
    backgroundColor: "#8A2BE2",
    padding: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  playlistGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  playlistItem: {
    marginBottom: 16,
  },
  playlistImage: {
    width: "100%",
    height: 130,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
  playlistName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
  },
  playlistTracks: {
    fontSize: 11,
    color: "#888",
  },
  loadingText: {
    fontSize: 14,
    color: "#888",
    padding: 10,
  },
  tracksGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tracksGridColumn: {
    width: "48%",
  },
  musicPlayerPlaceholder: {
    height: 70,
    backgroundColor: "#252525",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
});
