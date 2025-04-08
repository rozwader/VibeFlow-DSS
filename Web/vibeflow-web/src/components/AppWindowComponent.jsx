import { useEffect, useState } from "react";
import PlaylistsWindowComponent from "./appWindowComponents/PlaylistsWindowComponent";
import HomeWindowComponent from "./appWindowComponents/HomeWindowComponent";

const AppWindowComponent = (props) => {
  const [page, setPage] = useState(undefined);

  const generateComponent = (component) => {
    switch (component) {
      case "playlists":
        setPage(<PlaylistsWindowComponent />);
        break;
      case "home":
        setPage(<HomeWindowComponent />);
      default:
        setPage(<HomeWindowComponent />);
        break;
    }
  };

  useEffect(() => {
    generateComponent(props.currentPage);
  }, [props.currentPage]);

  return <div className="w-1/1 h-1/1 bg-white overflow-y-scroll">{page}</div>;
};

export default AppWindowComponent;
