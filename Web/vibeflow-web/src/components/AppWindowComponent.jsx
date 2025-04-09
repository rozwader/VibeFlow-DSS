import { useEffect, useState } from "react";
import PlaylistsWindowComponent from "./appWindowComponents/PlaylistsWindowComponent";
import HomeWindowComponent from "./appWindowComponents/HomeWindowComponent";
import ArtistWindowComponent from "./appWindowComponents/ArtistWindowComponent";

const AppWindowComponent = (props) => {
  const [page, setPage] = useState(undefined);

  const generateComponent = (component) => {
    const pageById = component.split(" ")
    if(pageById.length > 1){
      switch(pageById[0]){
        case "artist":
          setPage(<ArtistWindowComponent artistId={pageById[1]} />)
          break;
        default:
          break;
      }
    }else{
      switch (component) {
        case "playlists":
          setPage(<PlaylistsWindowComponent />);
          break;
        case "home":
          setPage(<HomeWindowComponent setCurrentPage={props.setCurrentPage} />);
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
