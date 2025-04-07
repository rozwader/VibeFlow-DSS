import { useEffect, useState } from "react";
import PlaylistWindowComponent from "./appWindowComponents/PlaylistWindowComponent";

const AppWindowComponent = (props) => {

    const [page, setPage] = useState(undefined);

    const generateComponent = (component) => {

        switch(component){
            case "playlist":
                setPage(<PlaylistWindowComponent />)
                break;
            default:
                setPage(undefined)
                break;
        }
    }

    useEffect(() => {
        generateComponent(props.currentPage)
    }, [props.currentPage])

    return(
        <div className="w-1/1 h-1/1">
            {page}   
        </div>
    )

}

export default AppWindowComponent;