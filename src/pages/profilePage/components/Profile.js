import { useParams } from "react-router-dom";
import {  actionOneUser } from "../../../api"
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

    useEffect(() => {
      dispatch(actionOneUser(userId))
  }, [userId, dispatch]);
  

    return (
      status === "PENDING" || !payload ? <CircularProgress />
      : 
      (
        payload ?
        <div className="profile-container">
         <div>
         {payload.avatar ? (<img className="avatar" src={`${API_URL}/${payload?.avatar?.url}`} alt="avatar" />) : (<img className="avatar" src={noAvatarPhoto} alt="no avatar" />)}
         </div>

          <div>
            <div className="editing-block">
            <span>{payload.login}</span>
            <button>Edit profile</button>
            </div>

            <div className="follow-container">
            {payload.followers && payload.followers.length ? (payload.followers.map(item => item.login)) : '0 followers'}
            {payload.following && payload.following.length ? (payload.following.map(item => item.login)) : '0 following'}
            </div>
          </div>

          
        </div>  
          : null
      )
    
    )
}

export default Profile;