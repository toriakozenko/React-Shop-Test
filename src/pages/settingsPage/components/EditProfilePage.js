import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionEditUserPage } from "../../../api/users";
import FilesUploader from "../../createNewPost/components/FilesUploader";
import { useNavigate } from "react-router-dom";
import './style.scss';

function EditProfilePage() {

  const userId = useSelector(state => state?.promise?.userProfile?.payload?._id);
  const [changeLogin, setChangeLogin] = useState('');
  const [fileUrl, setFileUrl] = useState("");
  const [fileId, setFileId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleEditUser = () => {
    if (changeLogin.trim() !== '' && changeLogin.trim() !== '' && fileId && fileUrl) {
      dispatch(actionEditUserPage(userId, changeLogin, fileId));
      navigate(`/profile/${userId}`); 
    }
  };

  const handleFileUpload = (id, url) => {
    setFileId(id);
    setFileUrl(url);
  };
 
  return (
    <div className='newPost-wrapper' id="editPost">
      <div className='newPost-container'> 
      <h2>Edit your profile</h2>

       <FilesUploader onFileUpload={handleFileUpload} />
       
    <div className='input-wrapper'>
      <input placeholder='login' type="text" value={changeLogin} onChange={e => {
          setChangeLogin(e.target.value);
        }}/>
      
      <button onClick={handleEditUser}>Submit</button>
    </div>
    </div>
    </div>
  )
}

export default EditProfilePage;


