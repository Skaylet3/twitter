import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import './TweetCard.css';
import Navbar from '../Navbar/Navbar';
import Searchfield from '../Searchfield/Searchfield';
import Post from '../Post/Post';
import ReusableNavBar from '../ReusableNavBar/ReusableNavBar';
import ReusableFormForPosts from '../ReusableFormForPosts/ReusableFormForPosts';
import { UserContext } from '../../context/UserContext';
import { ReplyTextContext } from '../../context/ReplyTextContext';
import ReusableFormForReplies from '../ReusableFormForReplies/ReusableFormForReplies';

const TweetCard = () => {
  //image's state 
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  //middleware to upload image
      const uploadImage = async (file) => {
          const formData = new FormData();
          formData.append('file', file);
  
          console.log("file", file);
  
          const res = await fetch('http://localhost:4000/upload', {
              method: 'POST',
              credentials: 'include',
              body: formData
          });
  
          const data = await res.json();
          console.log("data to reply: ", data);
          setImagePreview(data.imageUrl);
          return data.key;   
      };
  
      //primary image handler function
      const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
          const url = await uploadImage(file);         // getting really key
          console.log("data napusyashaa:", file);
          setImage(url);
      }
      };

  //create tweet function
    const napuskaCreateTweet = async () => {
        try {
            console.log("image before fetch:", image);
            const res = await fetch('http://localhost:3000/api/tweets', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: replyText,
                image: image,
                inReplyTo: tweetId,
            })
        });
        const tweet = await res.json();
        console.log("Tweet create function data: ", tweet);

        } catch(err) {
            console.error("Error: ", err.message);
        }
    }

  //ref for content
  const divRef = useRef(null);

  //replyText context
  const { replyText, setReplyText } = useContext(ReplyTextContext);
    

  //get user context
  const { getUser } = useContext(UserContext);

  //get tweets function
  const fetchTweets = async () => {

    setLoading(true);
      
    try {
    const res = await fetch(
    `http://localhost:3000/api/tweets?limit=10${cursor ? `&cursor=${cursor}` : ""}&onlyRoots=false&repliesTo=${tweetId}`,
    { credentials: 'include' }
    );
    const data = await res.json();
    console.log("Data suka: ", data);
      
    setTweets(prev => {
      const existingIds = new Set(prev.map(t => t._id));
      const newItems = data.items.filter(t => !existingIds.has(t._id));
      return [...prev, ...newItems];
    });

    if(!data.nextCursor || data.items.length === 0) {
      setCursor(null);
    } else {
      setCursor(data.nextCursor);
    }
    
    } catch (err) {
    console.error("Error fetching tweets:", err);
    } finally {
    setLoading(false);
    }
    };
  
  useEffect(() => {
          getUser();
          fetchTweets();
        }, []);

  //cursor state
  const [cursor, setCursor] = useState(null);

  // observers ref
  const observer = useRef();
  
  // loading's state
  const [loading, setLoading] = useState(false);

  //observer
  const lastTweetRef = useCallback(
    node => {
      if (observer.current) observer.current.disconnect(); // always clear old
    
      // If loading or no node or no more tweets → skip
      if (loading || !node || cursor === null) return;

      observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && cursor) {
        observer.current.unobserve(node); // stop watching this one to avoid double triggers
        console.log("Fetching more tweets");
        fetchTweets();
      }
      });
    
      observer.current.observe(node);
    },
  [loading, cursor]
  );

  // tweets's states
  const [tweets, setTweets] = useState([]);
  // const [lastCreatedTweets] = useState([]);

  //tweet id
  const { tweetId } = useParams();  

  //tweets data
  const [tweetAvatar, setTweetAvatar] = useState(null);
  const [tweetContent, setTweetContent] = useState(null);
  const [tweetUsername, setTweetUsername] = useState(null);
  const [tweetNickname, setTweetNickname] = useState(null);
  const [tweetImage, setTweetImage] = useState(null);
  const [tweetExactTime, setTweetExactTime] = useState(null);
  const [tweetExactDay, setTweetExactDay] = useState(null);
  const [tweetExactMonth, setTweetExactMonth] = useState(null);
  const [tweetExactYear, setTweetExactYear] = useState(null);


  //get tweet
  useEffect(() => {
        const loadParent = async () => {
          try{
            const replyTo = tweetId;

            const res = await fetch(`http://localhost:3000/api/tweets/${replyTo}`, {credentials: 'include'});
            const data = await res.json();
            console.log("Tweet:::::", data);
            setTweetAvatar(data.tweet.author.avatar);
            setTweetContent(data.tweet.content);
            setTweetUsername(data.tweet.author.username);
            setTweetNickname(data.tweet.author.nickname);
            setTweetImage(data.tweet.image);
            setTweetExactTime(data.tweet.exactTime);
            setTweetExactDay(data.tweet.exactDay);
            setTweetExactMonth(data.tweet.exactMonth);
            setTweetExactYear(data.tweet.exactYear);
          }catch(err){
            console.error("Error: ", err.message);
          }
        }
        loadParent();
      }, []);

  return (
    <div className="bg-white z-20 fixed top-0 left-0 w-screen h-screen h-[100dvh] flex flex-col justify-center items-center overflow-x-hidden box-border m-0 p-0 " >
        <div className="Homee p-0 m-0 box-border w-auto h-[100%] grid grid-cols-[250px_620px_360px] [@media(max-width:1280px)]:grid-cols-[57px_620px_360px] ">
          <div className="w-full [@media(max-width:500px)]:w-screen h-[100%] flex flex-row [@media(min-width:500px)]:flex-col fixed bottom-0 [@media(min-width:500px)]:static z-10 [@media(min-width:500px)]:col-start-1 [@media(min-width:500px)]:col-end-2 [@media(max-width:500px)]:h-15 "> 
            <Navbar />
          </div>
          <div className="h-screen w-full col-start-1 col-end-2 [@media(min-width:500px)]:col-start-2 [@media(min-width:500px)]:col-end-3 overflow-y-scroll custom-scroll">
            <div className='w-full ' >
              <ReusableNavBar
                menuName={'Post'}
              />
            </div>
            <div className='w-full ' >
              <Post
                tweetId={tweetId}
                nickname={tweetNickname}
                username={tweetUsername}
                avatar={tweetAvatar}
                content={tweetContent}
                image={tweetImage}
                exactTime={tweetExactTime}
                exactDay={tweetExactDay}
                exactMonth={tweetExactMonth}
                exactYear={tweetExactYear}
                cardActive={true}
              />
            </div>
            <div className='w-full ' >
              <ReusableFormForReplies
                placeholder={'Post your reply'}
                buttonText={'Reply'}
                ref={divRef}
                image={imagePreview}
                onImageChange={handleImageChange}
                onCreate={napuskaCreateTweet}
              />
            </div>
          {/* {
            lastCreatedTweets.map((tweet) => {
              return(
                <div key={tweet._id} >
                  <Post
                      tweetId={tweet._id}
                      content={tweet.content}
                      nickname={tweet.author.nickname}
                      username={tweet.author.username}
                      avatar={tweet.author.avatar}
                      image={tweet.image}
                      date={tweet.timeAgo}
                  />
                </div>  
              );
            })
          } */}
          {
            tweets.map((tweet, index) => {
              const isLast = index === tweets.length - 1;
              return(
                <div ref={isLast ? lastTweetRef : null} key={tweet._id} >
                  <Post
                      tweetId={tweet._id}
                      content={tweet.content}
                      nickname={tweet.author.nickname}
                      username={tweet.author.username}
                      avatar={tweet.author.avatar}
                      image={tweet.image}
                      date={tweet.timeAgo}
                  />
                </div>  
              );
            })
          }
          {loading && (
            <div className='text-center py-4 text-gray-300 ' >Loading more tweets...</div>
              )}
          </div>
          <div className="w-[100%] h-[100%] flex flex-col [@media(min-width:1000px)]:col-start-3 [@media(min-width:1000px)]:col-end-4 [@media(max-width:1000px)]:hidden ">
            <Searchfield />
          </div>
          </div>
        </div>
  )
}

export default TweetCard
