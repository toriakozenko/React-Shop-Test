import { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from 'react-redux';
import { actionAllPosts } from '../../../api/posts.js';
import { POSTS_LIMIT } from '../../../constants/Posts_Limit.js';
import { actionAddPosts, actionSetPosts } from '../../../store/postsReducer.js';
import PostSmall from './PostSmall.js';
import './style.scss';

function ExplorePosts() {
  const [ skipPosts, setSkipPosts ] = useState(0);
  const dispatch = useDispatch();
  const posts = useSelector(state => state?.posts);
  
    useEffect(() => {
      async function fetchData() {
        const allPosts = await dispatch(actionAllPosts(skipPosts, POSTS_LIMIT));
        console.log('skipPosts', skipPosts);
        console.log('POSTS_LIMIT', POSTS_LIMIT);
       dispatch(actionSetPosts(allPosts));
      }
      fetchData()
    },[dispatch])

    async function fetchMorePosts() {
      setSkipPosts(skip => skip + POSTS_LIMIT)
      const newPosts = await dispatch(actionAllPosts(skipPosts + POSTS_LIMIT, POSTS_LIMIT));
      console.log('new posts', newPosts)
      dispatch(actionAddPosts(newPosts));
    }    
    
  return (
    <div className="following-posts">
    <ul className="post-container">
      {posts?.length ? (
        <InfiniteScroll
          dataLength={posts?.length}
          next={fetchMorePosts}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {posts?.map((post, index) => (
            <PostSmall key={index} post={post} />
          ))}
        </InfiniteScroll>
      ) : null}
    </ul>
  </div>
  )
}

export default ExplorePosts;



