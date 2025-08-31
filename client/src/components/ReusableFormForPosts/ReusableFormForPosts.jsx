import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFaceSmileBeam, faImage, faImages, faSquarePollHorizontal} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../../context/UserContext';

const ReusableFormForPosts = ({ placeholder ,buttonText, content, image, onCreate, onImageChange, onWriting, ref }) => {
    //getCurrentUser
    const { getUser, avatarUser } = useContext(UserContext);

    useEffect(() => {
        getUser();
    }, []);

    //content checker
    useEffect(() => {
        console.log("text iss: ", content);
    }, [content]);

    //placeholder's state
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    
    //checker before the post is shared
    const NaputikLogin = (e) => {
        e.preventDefault();
        if(ref.current) {
            const text = ref.current.innerText;
        console.log(text);
        console.log(image);
        }
    }

  return (
    <form onSubmit={NaputikLogin} className="w-[100%] flex flex-row ">
        <fieldset className=" w-full flex flex-row ">
            
        <div className="w-[40px] h-[40px] ml-3 mr-3">
            {avatarUser && <img className="h-full w-full rounded-full" src={avatarUser} />}
        </div>
            
            <div className="h-full w-[88%] flex flex-col">
                <div className="h-full w-full " >
                    
                        <div className="relative w-full">
                            {showPlaceholder && (
                                <span className="absolute top-0 left-0 text-gray-400 pointer-events-none text-lg select-none">
                                  {placeholder}
                                </span>
                            )}
                            <div
                                ref={ref}
                                contentEditable
                                onInput={() => {
                                const text = ref.current?.innerText.trim();
                                setShowPlaceholder(text === "");
                                onWriting(text);
                                }}
                                onFocus={() => {
                                const text = ref.current?.innerText.trim();
                                setShowPlaceholder(text === "");
                                }}
                                onBlur={() => {
                                const text = ref.current?.innerText.trim();
                                setShowPlaceholder(text === "");
                                }}
                                className=" mt-1 h-auto max-h-[900px] min-h-[40px] w-full outline-none text-black text-lg font-normal z-10 break-all overflow-y-auto "
                            ></div>
                        </div>
                    
                {image && (
                    <div className=" w-[80%] h-auto max-h-[800px] bg-black rounded-2xl overflow-hidden flex justify-center items-center self-center  mb-5 ">
                        <div className=" w-full h-full bg-black rounded-2xl overflow-hidden flex justify-center items-center relative ">
                            <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black border-6 z-20 " >
                                <img className="w-full h-full z-30 object-contain " src="/src/assets/RealX.png" />
                            </div>
                            <img 
                                src={image}
                                className="object-contain w-100% h-auto  max-h-[500px] " 
                                alt="media"
                            />
                        </div>
                    </div>
                )}
                </div>
                <div className="w-[100%] flex flex-row mt-4">
                    <div className="w-[36.5%] h-[100%] flex flex-row pl-2 justify-between">
                        <label className="cursor-pointer" >
                            <div className="w-auto flex items-center pb-4 relative ">
                                <input  type="file" accept="image/*" onChange={onImageChange} className="hidden"  />
                                <FontAwesomeIcon className="text-[#1DA1F2] text-base" icon={faImage} />
                            </div>
                        </label>
                        <div className="w-auto flex items-center pb-4">
                            <FontAwesomeIcon className="text-[#1DA1F2] text-base" icon={faImages} />
                        </div>
                        <div className="w-auto h-[100%] flex items-center pb-4">
                            <FontAwesomeIcon className="text-[#1DA1F2] text-base" icon={faSquarePollHorizontal} />
                        </div>
                        <div className="w-auto h-[100%] flex items-center pb-4">
                            <FontAwesomeIcon className="text-[#1DA1F2] text-base" icon={faFaceSmileBeam} />
                        </div>
                        <div className="w-auto h-[100%] flex items-center pb-4">
                            <FontAwesomeIcon className="text-[#1DA1F2] text-base" icon={faCalendar} />
                        </div>
                    </div>
                    <div className="w-[59.5%] flex flex-row justify-end items-center pb-4">
                        <button type="submit" onClick={onCreate} className="bg-[#1DA1F2] rounded-full Roboto font-semibold text-base w-18 h-9 text-white">
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </fieldset>
    </form>
  )
}

export default ReusableFormForPosts