import { useState } from "react"
import ListOfPlaylistsComponent from "./ListOfPlaylistsComponent"

const ListOfSongsComponent = ({files, metadata}) => {

    const [playlistPopUp, setPlaylistPopUp] = useState(false);
    const [songToAddId, setSongToAddId] = useState();

    const handleClick = async (e, id) => {
        e.preventDefault();
        setPlaylistPopUp(!playlistPopUp);
        setSongToAddId(id);
    }

    return(
        <div className="flex flex-row gap-2 flex-wrap">
            {playlistPopUp ? (<ListOfPlaylistsComponent songToAddId={songToAddId} shutDown={setPlaylistPopUp} />) : (null)}
            {files ? (files.map((obj, index) => {
                return metadata[0].map((data) => {
                    if(data.fileName == obj){
                        return <div key={index} className="flex flex-col gap-1 border p-2 w-fit rounded-xl">
                            <span className="text-2xl font-semibold border p-2 rounded-xl flex flex-row items-center justify-between">{data.name} <button onClick={(e) => handleClick(e, data.id)} type="button" className="align-center rounded-3xl w-8 h-8 cursor-pointer">+</button></span>
                            <audio controls className="w-100">
                                <source src={`/uploads/${obj}`} type="audio/mpeg" />
                                Twoja przeglądarka nie obsługuje odtwarzacza audio.
                            </audio>
                            <span className="text-gray-500">Creator: {data.creator}</span>
                            <span className="text-gray-500">Artist: {data.artist != "" ? (data.artist) : ("Unknown")}</span>
                        </div>
                    }
                })
            })) : (null)}
        </div>
    )
}

export default ListOfSongsComponent;