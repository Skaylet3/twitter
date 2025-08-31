import { React, useState, useEffect, useRef, useContext } from 'react'
import ReusableFormForPosts from '../ReusableFormForPosts/ReusableFormForPosts'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';
import { ReplyTextContext } from '../../context/ReplyTextContext';
import ReusableFormForReplies from '../ReusableFormForReplies/ReusableFormForReplies';

const ModalReply = () => {
    //current location
    const navigate = useNavigate();

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
                inReplyTo: replyTo,
            })
        });
        const tweet = await res.json();
        console.log("Tweet create function data: ", tweet);

        } catch(err) {
            console.error("Error: ", err.message);
        }
    }

    //sockets
    // const { socket4000 } = useContext(SocketContext);
  
    // //using 4000 port socket
    //     useEffect(() => {
    //       socket4000.on("mediaReady", () => {
    //       setAvatarUser(prev => `${prev}?refresh=${Date.now()}`);
    //       });
    
    //       return () => socket4000.off("mediaReady");
    //     }, []);

    //tweet id
    const { replyTo } = useParams();
    
    //tweet's info
    const [tweetAvatar, setTweetAvatar] = useState(null);
    const [tweetContent, setTweetContent] = useState('');
    const [tweetUsername, setTweetUsername] = useState(null);
    const [tweetNickname, setTweetNickname] = useState(null);
    const [tweetDate, setTweetDate] = useState(null);
    const [tweetImage, setTweetImage] = useState(null);

    //fetch to get tweet
    useEffect(() => {
      const loadParent = async () => {
        const res = await fetch(`http://localhost:3000/api/tweets/${replyTo}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        console.log("Tweet:::::", data);
        setTweetAvatar(data.tweet.author.avatar);
        setTweetContent(data.tweet.content);
        setTweetUsername(data.tweet.author.username);
        setTweetNickname(data.tweet.author.nickname);
        setTweetDate(data.tweet.timeAgo);
        setTweetImage(data.tweet.image);
      };
      loadParent();
    }, []);
  
    //avatar's getting
  
      //content's state
      const { replyText, setReplyText } = useContext(ReplyTextContext);
  
      //ref for content
      const divRef = useRef(null);
  
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
  
      // //create tweet function
      // const napuskaCreateTweet = async () => {
      //     try {
      //         console.log("image before fetch:", image);
      //         const res = await fetch('http://localhost:3000/api/tweets', {
      //         method: 'POST',
      //         credentials: 'include',
      //         headers: {
      //             'Content-Type': 'application/json'
      //         },
      //         body: JSON.stringify({
      //             content: content,
      //             image: image
      //         })
      //     });
      //     const data = await res.json();
      //     console.log("The data is: ", data);
  
      //     } catch(err) {
      //         console.error("Error: ", err.message);
      //     }
      // }
  
  return (
    <div className=" fixed inset-0 bg-black/40 z-1000 flex items-start pt-12 justify-center ">
      <div className=" bg-white w-[600px] max-h-[865px] mx-4 p-1 rounded-2xl shadow-xl x-1001 overflow-x-hidden overflow-y-auto " >
        <div className='w-full p-3 ' >
          <div className='hover:bg-gray-100 rounded-full w-[35px] aspect-[1/1] flex justify-center items-center ' >
            <FontAwesomeIcon icon={faXmark} onClick={() => navigate(-1)} className='text-[20px] text-gray-400 ' />
          </div>  
        </div>  
        <div className='w-full flex p-3 relative mb-1  ' >
          <div className='flex flex-col ' >
            <div className='w-[40px] h-[40px] bg-amber-200 rounded-full mb-1 overflow-hidden ' >
              <img src={tweetAvatar} className='w-full aspect-[1/1]  ' />
            </div>
            
              <div className='w-[2px] flex-1 self-center bg-gray-300 ' >
              </div>
             
          </div>  
          <div className='w-[520px] overflow-x-hidden ' >
            <div className=' w-full mb-2 ml-3 ' >
              <span className="Roboto font-extrabold  text-[clamp(1.8rem, 10vw, 5rem)] " >
                {tweetNickname}
              </span>
              <span className="Roboto text-gray-400 ml-1.5 text-[clamp(1.8rem, 10vw, 5rem) font-semibold" >
                @{tweetUsername}
              </span>
              <span className="Roboto text-gray-500 ml-1 mr-1 text-[clamp(1.8rem, 10vw, 5rem)" >
                ·
              </span>
              <span className="Roboto text-gray-500 text-[clamp(1.8rem, 10vw, 5rem)" >
                {tweetDate}
              </span>
            </div>
            <div className='w-full max-h-[1000px] break-all ml-3 pr-5 overflow-hidden whitespace-pre-wrap  ' >
              <span className="w-full Roboto text-gray-500 text-base font-[450] flex flex-wrap flex-col mb-3 " >
                {tweetContent}
              </span>
              <div className='w-full rounded-2xl overflow-hidden ' >
                {tweetImage && <img src={tweetImage} className='object-cover w-full' />}
              </div>
            </div>
          </div>  
        </div>
        <div className=' ' >
          <ReusableFormForReplies 
            placeholder={"Post your reply"}
            buttonText={'Reply'}
            image={imagePreview}
            onCreate={napuskaCreateTweet}
            onImageChange={handleImageChange}
            ref={divRef}
          />
        </div>
      </div>
    </div>
  )
}

export default ModalReply
