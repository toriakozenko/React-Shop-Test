import { CircularProgress } from "@material-ui/core";
import { useState } from "react";
import dragAndDrop from '../../../assets/images/icons/CreateNewPostPage/dragAndDrop.png';
import { API_URL } from "../../../constants/Api_Graphql";
import './filesUploader.scss';

function FilesUploader({onFileUpload}) {

const [isLoading, setIsLoading] = useState(false);
const [dragEnter, setDragEnter] = useState(false);
const [uploadedFiles, setUploadedFiles] = useState([]);


const dragEnterHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true)
}

const dragLeaveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false)
}

const postFiles = async (files) => {
    for (const file of files) {
      const formData = new FormData();
      formData.append("photo", file);
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: localStorage.authToken
          ? { Authorization: "Bearer " + localStorage.authToken }
          : {},
        body: formData,
      });
      const data = await response.json();
      setUploadedFiles((prevUploadedFiles) => [
        ...prevUploadedFiles,
        { id: data._id, url: data.url }
      ]);

      if (onFileUpload) {
        onFileUpload(data._id, data.url);
      }
    }
  };

const fileUploadHandler = async (e) => {
    setIsLoading(true);
    const files = e.target.files;  
    await postFiles(files)
    setIsLoading(false);
}

const dropHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    const files = e.dataTransfer.files;
    await postFiles(files)
    setIsLoading(false);
}

return (
    <div className="drop-wrapper">{
        !dragEnter ?
            <div
                onDragEnter={(e) => dragEnterHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragEnterHandler(e)}

                className="labelFile"
            >
                {isLoading ?
                    <CircularProgress size={60} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  margin: 'auto', color: '#262626'}}/> :

                    <label >
                        <img src={dragAndDrop} alt="drag and drop"/>
                        <br />
                        Drag photos here
                        <input
                            accept=".jpg,.jpeg,.png,.pdf"
                            multiple={true}
                            onChange={(e) => fileUploadHandler(e)}
                            type="file"
                            className="inputFile"
                        />
                    </label>
                }
            </div>
            :
            <div
                onDragEnter={(e) => dragEnterHandler(e)}
                onDragOver={(e) => dragEnterHandler(e)}

                onDragLeave={(e) => dragLeaveHandler(e)}

                onDrop={(e) => dropHandler(e)}

                className="labelFile"
                
            >
                <img src={dragAndDrop} alt="drag and drop"/>
                    
                    Drop files here
            </div>
    }
   {uploadedFiles.length > 0 && (
        <div className="preview-photo">
          {uploadedFiles.map((file) => (
            <img key={file.id} src={`${API_URL}/${file.url}`} alt="pic" />
          ))}
        </div>
      )}
    </div>
)
}


export default FilesUploader;

