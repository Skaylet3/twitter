import { React, useContext, useEffect } from 'react'
import { RealProfileAvatarContext } from '../../context/RealProfileAvatarContext'
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const MiniProfileReference = () => {

  //getting user's info
  const { getUser, avatarUser, nicknameUser, usernameUser } = useContext(UserContext);
  
  
    //getting user's info
    useEffect(() => {
      getUser();
    }, []);

  return (
    <Link to="/profile" className='w-full h-full ' >
      <div className='w-full flex p-2 hover:bg-gray-100 transition-colors duration-200 ' >
        <div className='h-[45px] w-[45px] rounded-full overflow-hidden ' >
          <img src={avatarUser} className='object-cover w-full h-full ' />
        </div>
        <div className='flex flex-col ml-2 ' >
          <span className=' Roboto text-gray-900 font-bold text-[15px] truncate ' >
            {nicknameUser}
          </span>
          <span className='Roboto text-gray-400 font-bold text-[15px]' >
            @{usernameUser}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default MiniProfileReference
