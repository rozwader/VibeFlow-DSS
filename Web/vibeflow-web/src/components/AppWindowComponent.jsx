import { useEffect, useState } from "react";
import PlaylistsWindowComponent from "./appWindowComponents/PlaylistsWindowComponent";
import HomeWindowComponent from "./appWindowComponents/HomeWindowComponent";
import ArtistWindowComponent from "./appWindowComponents/ArtistWindowComponent";
import AlbumWindowComponent from "./appWindowComponents/AlbumWindowComponent";
import PlaylistWindowComponent from "./appWindowComponents/PlaylistWindowComponent";
import AlbumsWindowComponent from "./appWindowComponents/AlbumsWindowComponent";
import FavoritesWindowComponent from "./appWindowComponents/FavoritesWindowComponent";
import SearchWindowComponent from "./appWindowComponents/SearchWindowComponent";

const AppWindowComponent = (props) => {
  const [page, setPage] = useState(undefined);

  const generateComponent = (component) => { // "lokalny router" pozwala na latwe wyswietlanie komponentow glownych z folderu appWindowComponents 
    const pageById = component.split(" ")
    if(pageById.length > 1){
      switch(pageById[0]){ // pozwala na wyswietlanie stron o danym artyscie, playliscie lub albumie
        case "artist":
          setPage(<ArtistWindowComponent artistId={pageById[1]} setCurrentPage={props.setCurrentPage} />)
          break;
        case "album":
          setPage(<AlbumWindowComponent albumId={pageById[1]} setCurrentPage={props.setCurrentPage}/>)
          break;
        case "playlist":
          setPage(<PlaylistWindowComponent playlistId={pageById[1]} setCurrentPage={props.setCurrentPage}/>)
        default:
          break;
      }
    }else{
      switch (component) { // pozwala na wyswietlanie stron glownych, na ktorych sa wyswietlone albumy, playlisty, ulubione utwory jak i strona glowna
        case "playlists":
          setPage(<PlaylistsWindowComponent />);
          break;
        case "home":
          setPage(<HomeWindowComponent setCurrentPage={props.setCurrentPage} />);
          break;
        case "albums":
          setPage(<AlbumsWindowComponent setCurrentPage={props.setCurrentPage}/>)
          break;
        case "favorites":
          setPage(<FavoritesWindowComponent setCurrentPage={props.setCurrentPage}/>)
          break;
        case "search":
          setPage(<SearchWindowComponent setCurrentPage={props.setCurrentPage}/>)
          break;
        default:
          setPage(<HomeWindowComponent setCurrentPage={props.setCurrentPage} />);
          break;
      }
    };
    }

    

  useEffect(() => {
    generateComponent(props.currentPage);
  }, [props.currentPage]);

  return <div className="w-1/1 h-1/1 bg-white overflow-y-scroll">{page}</div>;
};

export default AppWindowComponent;
