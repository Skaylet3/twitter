import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Post from '../components/Post/Post';
import WhatsHappening from '../components/WhatsHappening/WhatsHappening';
import Switcher from '../components/Switcher/Switcher';
import Searchfield from '../components/Searchfield/Searchfield';
import './Profile.css';
import { useLocation } from 'react-router-dom';
import { FeedContext } from '../context/FeedSweetcherContext';
import Feed from '../components/Feed/Feed';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import ProfileInfo from '../components/ProfileInfo/ProfileInfo';
import { ApiContext } from '../context/Api';

const Profile = () => {

const { checkAuth } = useContext(ApiContext);

useEffect(() => {
  checkAuth()
}, []);

const location = useLocation();

console.log('pathname: ', location.pathname);
console.log('state: ', location.state);
//   const navigate = useNavigate();

//   const checkAuth = async () => {
//         try {
//           const res = await fetch('http://localhost:3000/api/auth/check-auth', {
//             credentials: 'include'  
//           });
//           if (!res.ok) throw new Error('Error: response is not ok');
//         } catch {
//           navigate('/register', { replace: true });
//         }
//       }

//   useEffect(() => {
//     checkAuth();
    
// }, []);

  return (
      <div className="w-screen h-screen h-[100dvh] flex flex-col justify-center items-center overflow-x-hidden overflow-y-hidden box-border m-0 p-0 " >
        <div className="Homee p-0 m-0 box-border w-auto h-[100%] grid grid-cols-[250px_620px_360px] [@media(max-width:1280px)]:grid-cols-[57px_620px_360px] ">
          <div className="w-full [@media(max-width:500px)]:w-screen h-[100%] flex flex-row [@media(min-width:500px)]:flex-col fixed bottom-0 [@media(min-width:500px)]:static z-10 [@media(min-width:500px)]:col-start-1 [@media(min-width:500px)]:col-end-2 [@media(max-width:500px)]:h-15 "> 
            <Navbar/>
          </div>
          <div className="h-[100%] w-full col-start-1 col-end-2 overflow-x-hidden [@media(min-width:500px)]:col-start-2 [@media(min-width:500px)]:col-end-3 overflow-y-scroll custom-scroll">
            <ProfileInfo />
          </div>
          <div className="w-[100%] h-[100%] flex flex-col [@media(min-width:1000px)]:col-start-3 [@media(min-width:1000px)]:col-end-4 [@media(max-width:1000px)]:hidden ">
            <Searchfield/>
          </div>
        </div>
      </div>
  )
}

export default Profile
