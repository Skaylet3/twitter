import React, { useContext } from 'react'
import Post from '../Post/Post'
import { useEffect, useState, useRef, useCallback } from 'react';
import WhatsHappening from '../WhatsHappening/WhatsHappening';
import { UserContext } from '../../context/UserContext';
import { useSocket } from '../../context/SocketContext';

const Feed = () => {

    //sockets
    const { socket3000, socket4000 } = useSocket();

    //using sockets
    useEffect(() => {
      socket3000.on("connect", () => {
        console.log("Connected to the server: ", socket3000.id);
      });

      socket3000.on("disconnect", () => {
        console.log("Disconnected from the server: ", socket3000.id);
      });

      return () => {
        socket3000.off("connect");
        socket3000.off("disconnect");
      };
    }, []);

    //using 4000 port socket
    useEffect(() => {
      socket4000.on("mediaReady", () => {
        setTweets(prev => prev.map(tweet => ({
            ...tweet,
            image: tweet.image ? `${tweet.image}?refresh=${Date.now()}` : null,
            author: {
            ...tweet.author,
            avatar: tweet.author?.avatar
              ? `${tweet.author.avatar}?refresh=${Date.now()}`
              : null,
          }
          }))
        );
      });

      return () => socket4000.off("mediaReady");
    }, []);

    //receiving the message from the server
    useEffect(() => {
      socket3000.on("welcome", (data) => {
        console.log(data.message);
      });
      return () => socket3000.off("welcome");
    }, []);

    useEffect(() => {
      socket3000.on("pongClient", (data) => {
        console.log("Got pong: ", data);
      });
      return () => socket3000.off("pongClient");
    }, []);

    //tweets's states
    const [tweets, setTweets] = useState([]);
    const [lastCreatedTweets, setLastCreatedTweets] = useState([]);

    //cursor state
    const [cursor, setCursor] = useState(null);

    //loading's state
    const [loading, setLoading] = useState(false);

    //observers ref
    const observer = useRef();

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
      [loading, cursor, tweets.length]
    );

    //get tweets function
    const fetchTweets = async () => {
        if (loading) return; // stop if already loading
        setLoading(true);

        try {
          const res = await fetch(
          `http://localhost:3000/api/tweets?limit=10${cursor ? `&cursor=${cursor}` : ""}&onlyRoots=true`,
          { credentials: 'include' }
        );
        const data = await res.json();
        console.log("Data suka: ", data);

        setTweets(prev => [...prev, ...data.items]);
        setCursor(data.nextCursor);
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
    
      const { getUser } = useContext(UserContext);
    

    useEffect(() => {
      console.log("Tweets currently: ", tweets);
      }, [tweets]);

          const handleUpdate = async (tweetId, content) => {
            try {
              const res = await fetch(`http://localhost:3000/api/tweets/${tweetId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ content })
            });

            const updatedTweet = await res.json();
            console.log(updatedTweet);

            } catch(err) {
                console.error("Update error: ", err);
              }
          }

      const handleDelete = async (tweetId) => {
        try {
          const res = await fetch(`http://localhost:3000/api/tweets/${tweetId}`, {
            method: 'DELETE',
            credentials: 'include',
          });
          const data = await res.json();
          console.log(data);
          setTweets(prev => prev.filter(tweet => tweet._id !== tweetId));
          
        } catch(err) {
          console.error('Error while deleting: ', err.message);
        } 
      };

    //write content into state function
    const writeContent = (text) => {
    setContent(text);
    };

    //content's state
    const [content, setContent] = useState('');
      
    //ref for content
    const divRef = useRef(null);
      
    //image's state 
    const [image, setImage] = useState(null);

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
        console.log("dataaaaaaa: ", data);
        return data.key;
    };

    //primary image handler function
    const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = await uploadImage(file);         // 🟢 Получаем реальный URL
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
                content: content,
                image: image,
                inReplyTo: null,
            })
        });
        const tweet = await res.json();
        console.log("Tweet create function data: ", tweet);
        setLastCreatedTweets(prev => [tweet, ...prev]);
        } catch(err) {
            console.error("Error: ", err.message);
        }
    }

  return (
    <div className="flex flex-col h-full w-full box-border">
      <div className="w-full hidden h-auto max-h-[1500px] mt-3 [@media(min-width:500px)]:block ">
        <WhatsHappening 
          onCreate={napuskaCreateTweet}
          onWriting={writeContent}
          onImageChange={handleImageChange}
          divRef={divRef}
          image={image}
          content={content}
        />
      </div>
          {
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
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                  />
                </div>  
              );
            })
          }
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
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                  />
                </div>  
              );
            })
          }
          {loading && (
            <div className='text-center py-4 text-gray-300 ' >Loading more tweets...</div>
          )}
    </div>
  );
}

export default Feed
