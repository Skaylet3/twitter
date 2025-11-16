import React from 'react'
import "./Post.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket, faBookmark, faChartSimple, faCheck, faComment, faHeart, faPen, faRetweet, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


const Post = ({tweetId, username, content, image, nickname, date, onDelete, onUpdate, avatar, cardActive, exactTime, exactMonth, exactDay, exactYear}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const background = location.state?.backgroundLocation || location;


  const editRef = useRef(null);

  const [newContentt, setNewContentt] = useState('');

  const [edit, setEdit] = useState(true);

  useEffect(() => {
    if (!edit && editRef.current) {
      editRef.current.focus();
    }
  }, [edit]);  
  
  useEffect(() => {
    console.log(image);
  }, []);

  return (
    <div 
    className='flex flex-col relative h-auto w-full border-t border-gray-200 group'
    >
      <div onClick={() => { 
        if(!cardActive) {
        navigate(`/${username}/status/${tweetId}`, {
        state: { backgroundLocation: background },
      })
    } 
    }} 
    className={`w-full h-full absolute top-0 left-0 ${cardActive ? '' : 'group-hover:bg-gray-50'} transition-colors duration-150 select-all cursor-pointer `} ></div>
      <div className="flex flex-row h-[45px] ml-3.5 mt-3.5 w-auto items-center group ">
        <div className='w-full h-full relative flex flex-row ' >
          <div className="w-11 h-11">
            {avatar && <img src={avatar} className="h-full w-full rounded-full"/>}
          </div>
            <div className={`w-full h-full absolute flex ${cardActive ? 'flex-col' : 'flex-row'} pl-[50px] `} >
              <span className="Roboto font-extrabold  ml-1 text-[clamp(1.8rem, 10vw, 5rem)] ">{nickname}</span>
              <span className="Roboto text-gray-400 ml-1 text-[clamp(1.8rem, 10vw, 5rem) font-semibold">@{username}</span>
              {cardActive ? <div></div>  : <div><span className="Roboto text-gray-500 ml-1 mr-1 text-[clamp(1.8rem, 10vw, 5rem)">·</span>
              <span className="Roboto text-gray-500 text-[clamp(1.8rem, 10vw, 5rem)">{date}</span></div>}
            </div> 
            {!edit &&
              <button className="w-[20px] h-[20px] z-20 ml-115 " onClick={() => {
              setEdit(!edit);
              onUpdate(tweetId, newContentt);
              console.log(edit);
              }} >
                <FontAwesomeIcon className="text-[#1DA1F2] text-md z-0 " icon={faCheck}/>
              </button>
            } 
            {!edit &&
              <button className="w-[20px] h-[20px] z-20 " onClick={() => {
              setEdit(!edit);
              console.log(edit);
              }} >
                <FontAwesomeIcon className="text-[#1DA1F2] text-md z-0 " icon={faXmark}/>
              </button> 
            }
            {edit && 
              <button className="w-[20px] h-[20px] ml-120 z-20 " onClick={() => {
                setEdit(!edit);
                console.log(edit);
                
                }} >
                <FontAwesomeIcon className="text-[#1DA1F2] text-md z-0 " icon={faPen}/>
              </button>
            }
            <button className="w-[20px] h-[20px] ml-auto mr-4 z-20 " onClick={ () => {
              onDelete(tweetId);
            }} >
              <FontAwesomeIcon className="text-[#1DA1F2] text-md z-0 " icon={faTrash}/>
            </button>
        </div>
      </div>
      <div className={`flex flex-col w-full h-full items-end ${cardActive ? 'pl-4' : 'pl-17' } pr-4 group `} >
        <div className='w-full ' >
          {edit && <div className={`w-full self-center ${cardActive ? 'mt-4' : 'mt-0'} h-auto flex break-all flex-col mb-5 `}>
            <div className="Roboto text-gray-500 text-base font-semibold break-words whitespace-pre-wrap flex flex-wrap flex-col z-2">
              {content}
            </div>
          </div>
          }
          {!edit && <div className="w-[80%] self-center h-auto flex break-all flex-col">
            <div 
            className="Roboto text-gray-500 text-base font-semibold break-words whitespace-pre-wrap flex flex-wrap flex-col outline-[#1DA1F2] outline-2 "
            contentEditable
            suppressContentEditableWarning
            ref={editRef}
            onInput={() => {
              const text = editRef.current?.innerText;
              setNewContentt(text);
              console.log(newContentt);
            }}
            >
              {content}
            </div>
          </div>
          }
            {image && <div className=" w-auto h-auto border-1 group-hover:border-gray-200 group-hover:border-1 group-hover:bg-blue-50 border-gray-200 rounded-2xl overflow-hidden flex justify-center items-center self-center  mb-5 ">
              <img 
                src={image}
                className="object-contain w-full h-full z-2 cursor-pointer " 
                alt="media"
              />
            </div>}
            
            {cardActive && <div className='w-full h-full flex flex-row border-b-1 border-gray-200 mb-3 pb-3 '>
                <div>
                  <span className='Roboto text-gray-500 text-[clamp(1.8rem, 10vw, 5rem) ' >{exactTime} </span>
                  <span className="Roboto text-gray-500 text-[clamp(1.8rem, 10vw, 5rem)"> · </span>
                  <span className="Roboto text-gray-500 text-[clamp(1.8rem, 10vw, 5rem)">{exactMonth} </span>
                  <span className="Roboto text-gray-500 text-[clamp(1.8rem, 10vw, 5rem)">{exactDay}, </span>
                  <span className="Roboto text-gray-500 text-[clamp(1.8rem, 10vw, 5rem)">{exactYear}</span>
                </div>
            </div>}

            </div>
          <div className="flex flex-row w-full h-9 justify-between self-center border-b-1 border-gray-200 mb-4 ">
            <div className="flex flex-row h-auto gap-1 z-2 cursor-pointer ">
              <FontAwesomeIcon className="text-[#1DA1F2] text-lg z-2" icon={faComment} onClick={() => navigate(`/compose/post/${encodeURIComponent(tweetId)}`, {
                state: { backgroundLocation: background },
              })} />
              <span className="text-[#1DA1F2] text-sm font-semibold z-2">222</span>
            </div>
            <div className="flex flex-row h-auto gap-1 z-2">
              <FontAwesomeIcon className="text-[#1DA1F2] text-lg z-2" icon={faRetweet}/>
              <span className="text-[#1DA1F2] text-sm font-semibold z-2">211</span>
            </div>
            <div className="flex flex-row h-auto items-start gap-1 z-2">
              <button className="flex flex-col justify-star h-full z-2">
                  <FontAwesomeIcon className="text-[#1DA1F2] text-lg z-2" icon={faHeart} />
              </button>
                <span className="text-[#1DA1F2] text-sm font-semibold z-2">0</span>
            </div>
            <div className="flex flex-row h-auto gap-1 z-2">
              <FontAwesomeIcon className="text-[#1DA1F2] text-lg z-2" icon={faChartSimple}/>
              <span className="text-[#1DA1F2] text-sm font-semibold z-2">212</span>
            </div>
            <div className=" h-100% flex flex-row gap-3 z-2">
              <div className="flex flex-row h-auto z-2">
                <FontAwesomeIcon className="text-[#1DA1F2] text-lg z-2" icon={faBookmark}/>
              </div>
              <div className="flex flex-row h-auto z-2">
                <FontAwesomeIcon className="text-[#1DA1F2] text-lg z-2" icon={faArrowUpFromBracket}/>
              </div>
            </div>
          </div> 
        </div>
      </div>   
  )
}

export default Post
