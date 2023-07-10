import { useParams } from "react-router-dom";
import { actionEditPost, actionOneUser } from "../../../api"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { API_URL } from "../../../constants/Api_Graphql";
import noAvatarPhoto from '../../../assets/images/icons/HomePage/no-avatar.svg';
import './style.scss';


function Profile() {
  const { userId } = useParams();
    const dispatch = useDispatch();
    const oneUser = useSelector(state => state.promise.oneUser);
    const state = useSelector(state => state);
    console.log('state', state);
    const { status, payload } = oneUser || {};
    console.log('payload', payload)

    useEffect(()=>{
      dispatch(actionOneUser(userId))
  }, [userId, dispatch]);

    return (
      status === "PENDING" || !payload ? <CircularProgress />
      : 
    (<div>
      {
        payload ?
        <div className="profile-container">
          {payload.avatar ? (<img className="avatar" src={`${API_URL}/${payload?.avatar?.url}`} alt="avatar" />) : (<img className="avatar" src={noAvatarPhoto} alt="no avatar" />)}
          <span>{payload.login}</span>
          {payload.followers && payload.followers.length ? (payload.followers.map(item => item.login)) : '0 followers'}
          {payload.following && payload.following.length ? (payload.following.map(item => item.login)) : '0 following'}

          
        </div>  
          : null
      }
     </div>)
    )
}

export default Profile;