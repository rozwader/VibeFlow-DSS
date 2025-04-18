import { useRouter } from "next/router";

const UploadFileWindowComponent = (props) => {
    const handleSubmit = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        
        const xhr = new XMLHttpRequest();

        xhr.onload = (obj) => {
            if(xhr.status === 200){
                console.log("Success");
                props.setCurrentPage("files");
            } else {
                console.log("Error");
            }
        }

        xhr.onerror = () => {
            console.log("Error");
        }

        xhr.open('POST', '/api/file/upload');
        xhr.send(formData);
    }

    return(
        <div>
            <form>
                <input type="file" name="file" onChange={(e) => handleSubmit(e.target.files[0])}/>
            </form>
        </div>
    );
}

export default UploadFileWindowComponent;