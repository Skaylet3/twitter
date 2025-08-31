import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState, useRef } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import ChangeProfileHeader from '../ChangeHeaderConstruction/ChangeProfileHeader/ChangeProfileHeader'
import { ProfileAvatarContext } from '../ChangeAvatarConstruction/ProfileAvatarContext'
import { ProfileHeaderContext } from '../ChangeHeaderConstruction/ProfileHeaderContext'
import { UserContext } from '../../context/UserContext'
import { SocketContext } from '../../context/SocketContext'
import { MediaBaseUrlContext } from '../../context/MediaBaseUrlContext'
import ChangeProfileAvatar from '../ChangeAvatarConstruction/ChangeProfileAvatar/ChangeProfileAvatar'

const EditProfileModal = () => {
    //official data for avatar and header states
    const [avatarKey, setAvatarKey] = useState(null);
    const [headerKey, setHeaderKey] = useState(null);

    //media based url context
    const { MediaBaseUrlProvider } = useContext(MediaBaseUrlContext);

    //sockets
    const { socket4000 } = useContext(SocketContext);
  
    //using 4000 port socket
        useEffect(() => {
          socket4000.on("mediaReady", () => {
          setPreview(prev => `${prev}?refresh=${Date.now()}`);
          setPreviewHeader(prev => `${prev}?refresh=${Date.now()}`);
          setAvatarUser(prev => `${prev}?refresh=${Date.now()}`);
          setHeaderUser(prev => `${prev}?refresh=${Date.now()}`);
          });
    
          return () => socket4000.off("mediaReady");
        }, []);

  //Flag to control clicks and mouse selections
  const isSelectingRef = useRef(false);
  const isClickedRef = useRef(false);

  //checing of data valued
  const [nicknameIsSet, setNicknameIsSet] = useState(false);
  const [bioIsSet, setBioIsSet] = useState(false);

  //preview states
  const { preview, setPreview } = useContext(ProfileAvatarContext);
  const { previewHeader, setPreviewHeader } = useContext(ProfileHeaderContext);

  //bio
  const [ bio, setBio ] = useState(null);
  const [ nickname, setNickname ] = useState(null);

  //refs
  const bioRef = useRef(null);
  const nicknameRef = useRef(null);

  //to get the nickname and username function
  useEffect(() => {
    if(nicknameRef.current && nicknameIsSet) {
      console.log("nickname: ", nicknameRef.current.innerText);
      nicknameRef.current.innerText = nickname;
      console.log("nickname: ", nicknameRef.current.innerText);
    }
  }, [nicknameIsSet]);

  useEffect(() => {
    if(bioRef.current && bioIsSet) {
      console.log("bio: ", bioRef.current.innerText);
      bioRef.current.innerText = bio;
      console.log("bio: ", bioRef.current.innerText);
    }
  }, [bioIsSet]);

  //to record all bio function
  const handleBioChange = () => {
    const text = bioRef.current?.innerText || '';
    setBio(text);
  }; 
  //to record nickname function
  const handleNicknameChange = () => {
    const text = nicknameRef.current?.innerText || '';
    setNickname(text);
  };

  //save button function
  const saveClick = async () => {
      console.log('clicked');
      try {
        const res = await fetch('http://localhost:3000/api/users', {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ bio, nickname, preview, previewHeader })
        });

        const data = await res.json();
        console.log("The data is: ", data);

        setAvatarUser(data.avatar);
        setHeaderUser(data.header);
        setBioUser(data.bio);
        setNicknameUser(data.nickname);
      } catch(err) {
        console.error("error is: ", err.message);
    
    }
  } 

  //media base url context
  const { mediaBaseUrlConverter } = useContext(MediaBaseUrlContext);

  //getting user's info
    const { getUser, nicknameUser, bioUser, avatarUser, headerUser, setAvatarUser, setHeaderUser, setBioUser, setNicknameUser } = useContext(UserContext);
  
  
    useEffect(() => {
      getUser();
      setNickname(nicknameUser);
      setNicknameIsSet(true);
      setBio(bioUser);
      setBioIsSet(true);
      setPreview(avatarUser);
      setPreviewHeader(headerUser);
    }, []);

  const navigate = useNavigate();

  return (
    <div ref={isSelectingRef} className=" fixed inset-0 bg-black/40 z-1000 flex items-center justify-center " onMouseDown={() => { isSelectingRef.current = false; }}
      onMouseMove={() => { isSelectingRef.current = true; }}
      onMouseUp={() => {
        // to stop closing while selecting
        if (!isSelectingRef.current) {
        navigate(-1);
        }
      }} 
      >
      <div ref={isClickedRef} className=" bg-white w-[600px] h-[650px] mx-4 p-1 rounded-2xl shadow-xl x-1001 overflow-x-hidden overflow-y-scroll " onMouseDown={() => { isClickedRef.current = false; }}
      onMouseMove={() => { isClickedRef.current = true; }}
      onMouseUp={(e) => {
        // to stop closing while selecting
        if (!isClickedRef.current || isClickedRef.current) {
        e.stopPropagation();
        }
      }}  >
      <div className="h-15 w-full flex  flex-row  gap-11 items-center " >
        <div className='ml-4  ' >

          <FontAwesomeIcon icon={faXmark} className='text-gray-400 text-2xl ' />
        </div>  
        <div className=' ' >
          <span className='Segoe font-semibold text-xl text-[#1DA1F2] ' >
            Edit profile
          </span>
        </div>
        <div className=' ml-auto  ' >
          <button onClick={saveClick} className='w-[67px] h-[32px] bg-[#1DA1F2] text-shadow-md text-white font-semibold Segoe rounded-full ' >
            Save
          </button>
        </div>
      </div>
      <div className=" bg-white w-full h-full  shadow-xl x-1001 overflow-x-hidden " onClick={e => e.stopPropagation()} >
        <div className="w-full h-full " >
        <div className="h-[100%] w-[100%] flex flex-col gap-4" >
        <div className="w-full aspect-[15/5] bg-gray-300 relative">
          <ChangeProfileHeader />
          {previewHeader && <img src={previewHeader} className="w-full h-full object-cover " />}
        </div>
        <div className="px-4 -mt-12 ">
          <div className={`w-24 aspect-[1/1] z-100 rounded-full border-4 relative border-white overflow-hidden`}>
            <ChangeProfileAvatar />
            {preview && <img src={preview} className="w-full h-full object-cover " />}
          </div>
       </div>
            <div onClick={e => e.stopPropagation()} onInput={handleNicknameChange} ref={nicknameRef} onKeyDown={(e) => {
              if(e.key === 'Enter'){e.preventDefault();};
              console.log(nickname);
          }} contentEditable suppressContentEditableWarning={true} className=" p-2 w-[96%] self-center relative border-1 rounded-sm text-base text-gray-600 font-medium  border-gray-300 overflow-y-auto focus:ring-1 focus:outline-none focus:ring-[#1DA1F2] focus:border-[#1DA1F2] caret-gray-600" >
            </div>

            <div onClick={e => e.stopPropagation()} onKeyDown={() => {
              console.log(bio);
            }} ref={bioRef} onInput={handleBioChange} contentEditable suppressContentEditableWarning={true} className=" p-2 w-[96%] self-center max-h-[100px] relative border-1 rounded-sm text-base text-gray-600 font-medium  border-gray-300 overflow-y-auto focus:ring-1 focus:outline-none focus:ring-[#1DA1F2] focus:border-[#1DA1F2] caret-gray-600  " >
            </div>

        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default EditProfileModal
