import { useRouter } from "next/router";
import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";

const UploadFileWindowComponent = (props) => {

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!e) return;

        const sentData = new FormData(e.currentTarget);
        const name = sentData.get("name");
        const artist = sentData.get("artist");
        const file = sentData.get("file");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("artist", artist);
        formData.append("user", localStorage.getItem("User"));
        
        const xhr = new XMLHttpRequest();

        xhr.onload = async (obj) => {
            if(xhr.status === 200){
                console.log("Success");
                props.setCurrentPage("userfiles");
            } else {
                console.log("Error");
                const fileName = file.name;

                try{
                    const request = await fetch("/api/file/getFile/", {
                        method: "POST",
                        body: JSON.stringify({fileName}),
                    })

                    if(request.ok){
                        const data = await request.json();
                        setError(`File Already Exists | Name: "${data.message}"`);
                    }
                }catch(err){
                    console.log(err);
                    setError("File Already Exists | Could not find the Name");
                }

            }
        }

        xhr.onerror = () => {
            console.log("Error");
        }

        xhr.open('POST', '/api/file/upload');
        xhr.send(formData);
    }

    return(
        <div className="p-8">
            <h1 className="text-3xl font-bold text-black mb-4">Upload a Track</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col w-fit gap-1">
                <input type="text" name="name" placeholder="Name" className="border p-2 text-xl font-semibold" required/>
                <input type="text" name="artist" placeholder="Artist ( Optional )" className="border p-2 text-xl font-semibold"/>
                <input type="file" name="file"  className="border p-2 text-xl" required/>
                <button type="submit" className="flex gap-1 items-center justify-center border border-black p-1 hover:bg-purple-500 hover:text-white hover:border-white transition-colors"><BsArrowUpRight className="ml-1" />Send</button>
            </form>
            {error != "" ? (<span className="text-red-500">{error}</span>) : (null)}
        </div>
    );
}

export default UploadFileWindowComponent;