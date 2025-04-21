import { useEffect, useState } from "react";

const UserFilesWindowComponent = () => {
    
    const [files, setFiles] = useState(null)
    const [metadata, setMetadata] = useState(null);

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
            <h1 className="text-3xl font-bold text-black mb-4">Your Uploads</h1>
            <div className="flex flex-row gap-2">
                {files ? (files.map((obj, index) => {
                    return metadata[0].map((data) => {
                        if(data.fileName == obj && data.creator == localStorage.getItem("User")){
                            return <div key={index} className="flex flex-col gap-1 border p-2 w-fit rounded-xl">
                                <span className="text-2xl font-semibold border p-2 rounded-xl">{data.name}</span>
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
        </div>
    );
}

export default UserFilesWindowComponent;