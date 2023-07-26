import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actionSubscribe } from "../../../api/follow";
import { actionUserPosts } from "../../../api/posts";
import { actionOneUser, actionUserProfile } from "../../../api/users";
import noAvatarPhoto from '../../../assets/images/icons/HomePage/no-avatar.svg';
import { API_URL } from "../../../constants/Api_Graphql";
import PostSmall from "../../explorePage/components/PostSmall";
import './style.scss';


function UserProfile() {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [isUserFollow, setIsUserFollow] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { userId } = useParams();
  const dispatch = useDispatch();

  const oneUser = useSelector(state => state?.promise?.oneUser);
  
  const userPosts = useSelector(state => state?.promise?.userPosts);

  const { login, id } = useSelector(state => state?.auth?.payload?.sub);

  const { status, payload } = oneUser || {};

  const [followersCount, setFollowersCount] = useState(payload?.followers?.length);
  console.log('payload?.followers?.length', payload?.followers?.length);

  const { payload: posts } = userPosts || {};

  const userProfile = useSelector(state => state?.promise?.userProfile);
  const { payload: newPayload } = userProfile || {};

  const oldUserId = newPayload?.following?.map(item => item._id) || [];
  const followerLogin = payload?.followers?.map(item => item.login);

  useEffect(() => {
    dispatch(actionUserProfile(id));
  }, [ dispatch, id ]);

  useEffect(() => {
    dispatch(actionOneUser(userId));
    dispatch(actionUserPosts(userId));
  }, [userId, dispatch]);


  const handleFollowers = () => {
    setShowFollowers(true);
  };

  const handleCloseFollowers = () => {
    setShowFollowers(false);
  };
  
  const handleFollowing = () => {
    setShowFollowing(true);
  };

  const handleCloseFollowing = () => {
    setShowFollowing(false);
  };

  const handleSubscribe = () => {
    dispatch(actionSubscribe(id, login,oldUserId, userId));
    setIsButtonDisabled(true);
    setFollowersCount(followersCount => followersCount + 1);
    setIsUserFollow(prevFollow => !prevFollow);
    
	}

  useEffect(() => {
    setFollowersCount(payload?.followers?.length);
  }, [payload?.followers]);

  return (
    !status || status === "PENDING" || !payload || !posts ? <CircularProgress size={60} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  margin: 'auto', color: '#262626'}} />
    : 
    (
      payload ?
      <div className="profile-container">
        <div className="profile-wrapper">

          {payload.avatar && payload.avatar.url !== null ? (<img className="avatar" src={`${API_URL}/${payload?.avatar?.url}`} alt="avatar" />) : (<img className="avatar" src={noAvatarPhoto} alt="no avatar" />)}
          

          <div className="profile-info-container">
            <div className="editing-block">
              <span>{payload.login !== ''  ? payload.login : 'anonim' }</span>

              <button onClick={handleSubscribe} disabled={isButtonDisabled}>{isUserFollow || (followerLogin && followerLogin?.includes(login)) ? 'Unfollow' : 'Follow'}</button>

            </div>

            <div className="follow-container">
              {posts && posts.length ? (<span>{posts.length} posts</span>) : (<span>0 posts</span>)}
              <div className="followers-container">
                {payload?.followers && payload?.followers?.length ? (<span  onClick={handleFollowers}>{followersCount} followers</span>) : <span>0 followers</span>}

                {showFollowers && (
                  <div className="popup-container">
                    <div className="popup-content">
                      <ul>
                      {payload?.followers !== null && payload?.followers?.length ? (payload.followers.map((item, index) => (
                          <li key={index}>{(item.login && item.login !== null ? <span>{item.login}</span> : <span>anonim</span>)}</li>
                        ))) : null}
                      </ul>
                    
                      <button onClick={handleCloseFollowers}>Close</button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="following-container">
                {payload.following && payload.following.length ? (<span  onClick={handleFollowing}>{payload.following.length} following</span>) : <span>0 following</span>}

                {showFollowing && (
                  <div className="popup-container">
                    <div className="popup-content">
                      <ul>
                      {payload?.following !== null && payload?.following?.length ? (payload.following.map((item, index) => (
                          <li key={index}>{(item.login && item.login !== null ? <span>{item.login}</span> : <span>anonim</span>)}</li>
                        ))) : null}
                
                      </ul>
                      <button onClick={handleCloseFollowing}>Close</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="posts-container">
          <ul className='posts-list'> {
            posts &&
            posts.length ?
            (posts?.map((item, index) => <PostSmall key={index} post={item}/>)) : (<span>User haven't posts yet.</span>)
          }
          </ul>
        </div>
      </div>  
      : null
    )
  )
}

export default UserProfile;


