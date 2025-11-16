import { faAngleRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { React, useState } from 'react'
import { NavLink } from 'react-router-dom';
import ReusableNavBar from '../ReusableNavBar/ReusableNavBar';
import ReusableNavBarNoArrow from '../ReusableNavBar/ReusableNavBarNoArrow';

const SettingsNavReallyBar = () => {
    //counter of the current menu
    const [menu, setMenu] = useState(3);

  return (
    <div className='w-full  ' >
      <div className="w-full" >
        <ReusableNavBarNoArrow 
          menuName={'Settings'}
        />
      </div>  
      <div className='w-full flex flex-col items-center mb-2 ' >
        <div className='w-[98%] h-10 rounded-full ' >
          <form className='w-full relative h-full ' >
            <label for='search' className='w-full h-full ' >
              <input type="search" id="search" placeholder='Search Settings' className='w-full h-full pl-10 rounded-full pr-3 border-1 border-gray-200 ' />
              <FontAwesomeIcon icon={faSearch} className='absolute left-4 top-[13px] text-[14px] text-gray-400 ' />
            </label>
          </form>
        </div>
      </div>  
      <div className=' ' >
        <NavLink to="account" onClick={() => setMenu(1)} className={`w-full h-[48px] ${menu === 1 ? 'bg-gray-100' : 'bg-transparent'} flex flex-row justify-between items-center relative`} >
          <div className='ml-4 ' >
            <span className='text-[15px] font-medium text-[#1DA1F2] ' >
              Your account
            </span>
          </div>  
          <div className='mr-5 ' >
            <FontAwesomeIcon icon={faAngleRight} className='text-[16px] text-gray-400 ' />
          </div>
          {menu === 1 && <div className='w-[2px] h-full bg-[#1DA1F2] absolute right-0 ' >
          </div>}
        </NavLink>
        <NavLink onClick={() => setMenu(2)} className={`w-full h-[48px] ${menu === 2 ? 'bg-gray-100' : 'bg-transparent'} flex flex-row justify-between items-center relative`} >
          <div className='ml-4 ' >
            <span className='text-[15px] font-medium text-[#1DA1F2] ' >
              Languiges
            </span>
          </div>  
          <div className='mr-5 ' >
            <FontAwesomeIcon icon={faAngleRight} className='text-[16px] text-gray-400 ' />
          </div>
          {menu === 2 && <div className='w-[2px] h-full bg-[#1DA1F2] absolute right-0 ' >
          </div>}
        </NavLink>
        <NavLink onClick={() => setMenu(3)} className={`w-full h-[48px] ${menu === 3 ? 'bg-gray-100' : 'bg-transparent'} flex flex-row justify-between items-center relative`} >
          <div className='ml-4 ' >
            <span className='text-[15px] font-medium text-[#1DA1F2] ' >
              Notifications
            </span>
          </div>  
          <div className='mr-5 ' >
            <FontAwesomeIcon icon={faAngleRight} className='text-[16px] text-gray-400 ' />
          </div>
          {menu === 3 && <div className='w-[2px] h-full bg-[#1DA1F2] absolute right-0 ' >
          </div>}
        </NavLink>
      </div>  
    </div>
  )
}

export default SettingsNavReallyBar
