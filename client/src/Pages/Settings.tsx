import React, { useContext } from 'react'
import Navbar from '../components/Navbar/Navbar';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SettingsNavBar from '../components/SettingsNavBar/SettingsNavBar';
import { ApiContext } from '../context/Api';
const Settings = () => {

  const { checkAuth } = useContext(ApiContext);

  useEffect(() => {
    checkAuth();
    
  }, []);

  return (
    
      <div className="w-screen h-screen h-[100dvh] flex flex-col justify-center items-center overflow-x-hidden box-border m-0 p-0 " >
        <div className="Homee p-0 m-0 box-border w-auto h-[100%] grid grid-cols-[250px_450px_530px] [@media(max-width:1280px)]:grid-cols-[57px_620px_360px] ">
          <div className="w-full [@media(max-width:500px)]:w-screen h-[100%] flex flex-row [@media(min-width:500px)]:flex-col fixed bottom-0 [@media(min-width:500px)]:static z-10 [@media(min-width:500px)]:col-start-1 [@media(min-width:500px)]:col-end-2 [@media(max-width:500px)]:h-15 "> 
            <Navbar/>
          </div>
          <aside className="h-[100%] w-full col-start-1 col-end-2 [@media(min-width:500px)]:col-start-2 [@media(min-width:500px)]:col-end-3 overflow-y-scroll overflow-x-hidden custom-scroll">
            <SettingsNavBar />  
          </aside>
          <main className="w-[100%] h-[100%] flex flex-col [@media(min-width:1000px)]:col-start-3 [@media(min-width:1000px)]:col-end-4 [@media(max-width:1000px)]:hidden ">
            <Outlet />
          </main>
        </div>
      </div>
    
  )
}

export default Settings
