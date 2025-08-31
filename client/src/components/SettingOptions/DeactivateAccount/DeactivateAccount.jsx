import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import React from 'react'
import MiniProfileReference from '../../MiniProfileReference/MiniProfileReference'
import ReusableNavBar from '../../ReusableNavBar/ReusableNavBar'

const DeactivateAccount = () => {

  //profile delete unction
  const onDeleteProfile = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      console.log(">", data);
    } catch(err) {
       console.error("Error: ", err.message);
    }
  };

  return (
    <div className='border-r-1 border-gray-200 h-full w-full ' >
      <div  >
        <div className="w-full" >
          <ReusableNavBar 
            menuName={'Deactivate account'}
          />
        </div>  
        <div className='w-full h-[67px] ml-1 ' >
          <MiniProfileReference />
        </div>
        <div className="w-full pl-3 pt-3 pb-3 border-gray-200 border-t-1 " >
            <span className='text-2xl Roboto font-bold text-[#1DA1F2]  ' >
            This will delete your account
            </span>
        </div>  
        <div className='w-full flex justify-start items-center mb-3  pb-3 ' >
            <span className='text-gray-400 text-[12px] font-medium ml-3 ' >
              Your account will be deleted from Twitter.
            </span>
        </div>
        <div onClick={onDeleteProfile} className='w-full flex justify-center border-gray-200 border-t-1 border-b-1 py-3 hover:bg-red-100 transition-colors duration-200 select-none ' >
          <button className='Roboto font-medium text-[16px] text-red-500 cursor-pointer select-none ' >
            Delete account
          </button>
        </div>
      </div>  
    </div>
  )
}

export default DeactivateAccount
