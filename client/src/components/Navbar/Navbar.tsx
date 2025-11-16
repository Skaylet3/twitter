import React from "react"
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faEnvelope, faBookmark, faBell, faUser, faSliders, faListCheck, faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import './Navbar.css';
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ProfileHeaderContext } from "../ChangeHeaderConstruction/ProfileHeaderContext";
import { RealProfileAvatarContext } from "../../context/RealProfileAvatarContext";
import { RealProfileHeaderContext } from "../../context/RealProfileHeaderContext";
import LittleProfileManager from "../LittleProfileManager/LittleProfileManager";
import Logout from "../Logout/Logout";
import { UserContext } from "../../context/UserContext";
import { SocketContext } from "../../context/SocketContext";

const Navbar = () => {

    //sockets
    const { socket4000 } = useContext(SocketContext);
  
    //using 4000 port socket
        useEffect(() => {
          socket4000.on("mediaReady", () => {
          setAvatarUser(prev => `${prev}?refresh=${Date.now()}`);
          });
    
          return () => socket4000.off("mediaReady");
        }, []);

  //getting user's info
  const { getUser, avatarUser, nicknameUser, usernameUser, setAvatarUser } = useContext(UserContext);
  

  //getting user's info
  useEffect(() => {
    getUser();
  }, []);
  
  //turning options little menu on

  //it's state

  const [turnOn, setTurnOn] = useState(false);

  const turnOptionsOn = () => {
    setTurnOn(!turnOn);
  };

  return (
    <div className=" w-[100%] h-[100%] border-r border-gray-200 flex flex-row [@media(min-width:500px)]:flex-col gap-4 box-border [@media(min-width:1280px)]:pr-2 ">
      <div className="h-auto w-screen [@media(min-width:500px)]:w-full flex flex-col " >
        <div className=" h-13 [@media(max-width:500px)]:hidden w-13 border-8 border-white self-start bg-white hover:bg-gray-200 hover:border-gray-200 rounded-full  flex justify-center items-center transition-colors duration-200 mt-1 mb-2.5 box-border">
            <img src="./src/assets//Logo.png" className="h-auto w-[100%]"/>
        </div>
        <div className="w-[100%] h-[100%] flex flex-row [@media(min-width:500px)]:flex-col ">
          <ul className="flex flex-row [@media(min-width:500px)]:flex-col w-[100%] h-[100%] gap-6 [@media(max-width:500px)]:gap-0 [@media(max-width:500px)]:justify-around bg-white ">
            <li>
                <div className="flex flex-row  w-full h-auto gap-4 group justify-start [@media(max-width:1280px)]:justify-end ">
                  <div className="flex flex-row [@media(max-width:500px)]:border-r-14 gap-0 [@media(min-width:500px)]:gap-4 bg-white border-14 border-r-40 border-white [@media(max-width:1280px)]:border-r-15 rounded-full transition-colors duration-200 group-hover:bg-gray-100 group-hover:border-gray-100">
                    <FontAwesomeIcon className="text-[#1DA1F2] text-2xl [@media(max-width:500px)]:text-2xl " icon={faHouse} />
                    <Link to="/home" className="Lato text-[#1DA1F2] text-1xl font-semibold hidden [@media(min-width:1280px)]:block no-underline Navbarr ">Home</Link>
                  </div>
                </div>
            </li>
            <li>
                <div className="flex flex-row gap-4 w-full h-auto group justify-start [@media(max-width:1280px)]:justify-end">
                  <div className="flex flex-row bg-white border-14 gap-0 [@media(min-width:500px)]:gap-4 [@media(max-width:500px)]:border-r-14 [@media(max-width:1280px)]:border-r-15 border-r-40 border-white rounded-full transition-colors duration-200 group-hover:bg-gray-100 group-hover:border-gray-100">
                    <FontAwesomeIcon className="text-[#1DA1F2] text-2xl [@media(max-width:500px)]:text-2xl " icon={faMagnifyingGlass} />
                    <Link to="/register" className="Lato text-[#1DA1F2] text-1xl font-semibold hidden no-underline Navbarr [@media(min-width:1280px)]:block">Explore</Link>
                  </div>
                </div>
            </li>
            <li>
                <div className="flex flex-row gap-4 group w-full h-auto justify-start [@media(max-width:1280px)]:justify-end">
                  <div className="flex flex-row gap-0 [@media(min-width:500px)]:gap-4 bg-white border-14 [@media(max-width:500px)]:border-r-14 border-r-40 border-white [@media(max-width:1280px)]:border-r-15 rounded-full transition-colors duration-200 group-hover:bg-gray-100 group-hover:border-gray-100">
                    <FontAwesomeIcon className="text-[#1DA1F2] text-2xl [@media(max-width:500px)]:text-2xl " icon={faEnvelope} />
                    <Link to="/profile" className="Lato text-[#1DA1F2] text-1xl font-semibold hidden [@media(min-width:1280px)]:block no-underline Navbarr ">Messages</Link>
                  </div>  
                </div>
            </li>
            <li>
                <div className="flex flex-row gap-4 w-full h-auto group justify-start [@media(max-width:1280px)]:justify-end">
                  <div className="flex flex-row gap-0 [@media(min-width:500px)]:gap-4 bg-white border-14 [@media(max-width:500px)]:border-r-14 border-r-40 border-white [@media(max-width:1280px)]:border-r-15 rounded-full transition-colors duration-200 group-hover:bg-gray-100 group-hover:border-gray-100">
                    <FontAwesomeIcon className="text-[#1DA1F2] text-2xl [@media(max-width:500px)]:text-2xl " icon={faBell} />
                    <h1 className="text-[#1DA1F2] Lato text-1xl font-semibold Navbarr [@media(min-width:1280px)]:block hidden ">Notifications</h1>
                  </div>  
                </div>
            </li>
            <li>
                <div className="flex flex-row gap-4 w-full h-auto group justify-start [@media(max-width:1280px)]:justify-end">
                  <div className="flex flex-row gap-0 [@media(min-width:500px)]:gap-4 bg-white border-14 [@media(max-width:500px)]:border-r-14 border-r-40 border-white [@media(max-width:1280px)]:border-r-15 rounded-full transition-colors duration-200 group-hover:bg-gray-100 group-hover:border-gray-100">
                    <FontAwesomeIcon className="text-[#1DA1F2] text-2xl [@media(max-width:500px)]:text-2xl " icon={faBookmark} />
                    <h1 className="text-[#1DA1F2] Lato text-1xl font-semibold Navbarr [@media(min-width:1280px)]:block hidden ">Bookmarks</h1>
                  </div>  
                </div>
            </li>
            <li>
                <div className="flex flex-row gap-4 w-full h-auto group justify-start [@media(max-width:1280px)]:justify-end">
                  <div className=" flex flex-row gap-0 [@media(min-width:500px)]:gap-4 bg-white border-14 [@media(max-width:500px)]:border-r-14 border-r-40 border-white rounded-full [@media(max-width:1280px)]:border-r-15 transition-colors duration-200 group-hover:bg-gray-100 group-hover:border-gray-100">
                    <FontAwesomeIcon className="text-[#1DA1F2] text-2xl [@media(max-width:500px)]:text-2xl " icon={faUser} />
                    <h1 className="text-[#1DA1F2] Lato text-1xl font-semibold Navbarr [@media(min-width:1280px)]:block hidden ">Profile</h1>
                  </div>  
                </div>
            </li>
            <li className="hidden [@media(min-width:500px)]:block " >
                <div className="flex flex-row gap-4 group justify-start [@media(max-width:1280px)]:justify-end">
                  <div className="flex flex-row gap-4 bg-white border-14 border-r-40 border-white rounded-full [@media(max-width:1280px)]:border-r-15 transition-colors duration-200 group-hover:bg-gray-100 group-hover:border-gray-100">
                    <FontAwesomeIcon className="text-[#1DA1F2] text-2xl" icon={faSliders} />
                    <Link to="/settings" className="text-[#1DA1F2] Lato text-1xl font-semibold Navbarr [@media(min-width:1280px)]:block hidden ">Settings</Link>
                  </div>  
                </div>
            </li>
            <li className="hidden [@media(min-width:500px)]:block " >
                <div className="flex flex-row gap-4 group justify-start [@media(max-width:1280px)]:justify-end">
                  <div className="flex flex-row gap-4 bg-white border-14 border-r-40 border-white rounded-full [@media(max-width:1280px)]:border-r-15 transition-colors duration-200 group-hover:bg-gray-100 group-hover:border-gray-100">
                    <FontAwesomeIcon className="text-[#1DA1F2] text-2xl" icon={faListCheck} />
                    <h1 className="text-[#1DA1F2] Lato text-1xl font-semibold Navbarr [@media(min-width:1280px)]:block hidden ">To Do</h1>
                  </div>  
                </div>
            </li>
            <li className="hidden [@media(min-width:500px)]:block " >
                <div className="flex flex-row gap-4 group justify-start [@media(max-width:1280px)]:justify-end">
                  <div className="flex flex-row gap-4 bg-white border-14 border-r-40 border-white rounded-full [@media(max-width:1280px)]:border-r-15 transition-colors duration-200 group-hover:bg-gray-100 group-hover:border-gray-100">
                    <FontAwesomeIcon className="text-[#1DA1F2] text-2xl" icon={faNoteSticky} />
                    <h1 className="text-[#1DA1F2] Lato text-1xl font-semibold Navbarr [@media(min-width:1280px)]:block hidden ">Notes</h1>
                  </div>  
                </div>
            </li>
          </ul>
        </div>
      </div>
      
          {turnOn && <Logout 
            username={usernameUser}

          />}
         
        <div className="mt-auto mb-4 w-full h-auto " >
          <LittleProfileManager
            avatar={avatarUser}
            nickname={nicknameUser}
            username={usernameUser}
            options={turnOptionsOn}
          />
        </div>
    </div>
  )
}

export default Navbar
