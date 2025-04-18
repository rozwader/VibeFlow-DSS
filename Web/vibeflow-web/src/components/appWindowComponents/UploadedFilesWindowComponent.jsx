import path from "path";
import { useEffect, useState } from "react";

const UploadedFilesWindowComponent = () => {

    const [files, setFiles] = useState(null)

    const getFiles = async () => {
        try{
            const request = await fetch("/api/file/getFiles/", {
                method: "POST",
            })

            if(request.ok){
                const data = await request.json();
                setFiles(data.message);
                console.log(data);
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
        <div>
            {files ? (files.map((obj, index) => {
                return <div key={index}><span>{index+1}. {obj}</span><audio controls className="w-100">
                <source src={`/uploads/${obj}`} type="audio/mpeg" />
                Twoja przeglądarka nie obsługuje odtwarzacza audio.
              </audio></div>
            })) : (null)}
        </div>
    )
}

export default UploadedFilesWindowComponent