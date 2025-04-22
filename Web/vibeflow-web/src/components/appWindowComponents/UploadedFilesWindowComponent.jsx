import { useEffect, useState } from "react";
import ListOfPlaylistsComponent from "../ListOfPlaylistsComponent";
import ListOfSongsComponent from "../ListOfSongsComponent";

const UploadedFilesWindowComponent = () => {

    const [files, setFiles] = useState(null)
    const [metadata, setMetadata] = useState(null);
    const [response, setResponse] = useState(null);

    const getFiles = async () => {
        try{
            const request = await fetch("/api/file/getFiles/", {
                method: "POST",
            })

            if(request.ok){
                const data = await request.json();

                try{
                    const metadataRequest = await fetch("/api/file/getMetadata/", {
                        method: "GET",
                    })

                    if(request.ok){
                        const data = await metadataRequest.json();
                        setMetadata(data.message);
                    }
                }catch(err){
                    console.log(`Couldn't get Metadata | ${err}`)
                }
                setFiles(data.message);
            }else{
                console.log("no files")
            }
        }catch(err){
            console.log(`Error | ${err}`);
        }
    }

    useEffect(() => {
        if(files == null){
            getFiles();
        }
    }, [])

    return(
        <div className="flex flex-col gap-2 p-8">
            <h1 className="text-3xl font-bold text-black mb-4">Hello, {localStorage.getItem("User")} 👋</h1>
            <div className="flex flex-row gap-2">
                <ListOfSongsComponent files={files} metadata={metadata}/>
            </div>
            {response != null ? (<span className="text-green-500">{response}</span>) : (null)}
        </div>
    )
}

export default UploadedFilesWindowComponent