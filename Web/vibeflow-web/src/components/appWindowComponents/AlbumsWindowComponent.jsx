import NewAlbumsComponent from "../NewAlbumsComponent";
import SavedAlbumsComponent from "../SavedAlbumsComponent";

const AlbumsWindowComponent = (props) => { // wyswietla nowe wydania albumow jak i te zapisane
  return <div className="w-1/1 h-1/1">
    <NewAlbumsComponent setCurrentPage={props.setCurrentPage}/>
    <SavedAlbumsComponent setCurrentPage={props.setCurrentPage}/>
  </div>;
};

export default AlbumsWindowComponent;
