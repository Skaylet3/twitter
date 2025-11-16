import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { useContext } from 'react'
import { ProfileAvatarContext } from '../ChangeAvatarConstruction/ProfileAvatarContext'
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'

const ProfileInformation = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { getUser, nicknameUser, usernameUser, monthUser, yearUser, bioUser } = useContext(UserContext);

  useEffect(() => {
    getUser()
  }, []);

  return (
    <div className="w-full h-auto  p-3 " >
      <div className='w-full h-[68px] mb-3 flex justify-end items-start ' >
            <button className='w-[113px] h-[36px] bg-[#1DA1F2] rounded-full text-base font-bold text-white Roboto ' onClick={() => navigate('/settings/profile', {
              state: { backgroundLocation: location }
          }) } >
                Edit profile
            </button>
        </div> {/* Edit profile */}
      <div className='w-full h-auto  mb-6 flex flex-col ' >
        <span className='Roboto font-extrabold text-2xl text-black ' > 
            {nicknameUser}
        </span>
        <span className='Roboto font-medium text-lg text-gray-400  ' >
            @{usernameUser}
        </span>
      </div> {/* Nickname, Username */}
      <div className='w-full h-auto  mb-3 ' >
        <span className='Roboto font-medium text-gray-800 text-base whitespace-pre-wrap break-words  ' >
          {bioUser}
        </span>
      </div> {/* Bio */}
      <div className='w-full h-auto  mb-3 flex items-center ' >
        <FontAwesomeIcon className="text-gray-400 text-md m-1 " icon={faCalendarDays} />
        <span className='text-gray-400 Roboto text-sm font-semibold mt-0.5 ' >
            Joined {monthUser} {yearUser}
        </span>
      </div> {/* Date of creating */}
      <div className='w-full h-auto  flex ' >
        <div className='w-auto h-auto  ' >
            <span className='text-base font-bold ml-1 mr-1 text-gray-900 Roboto ' >0</span>
            <span className='text-base font-medium text-gray-500 Roboto '>Following</span>
        </div>
        <div className='w-auto h-auto  ml-5 ' >
            <span className='text-base font-bold mr-1 text-gray-900 Roboto ' >0</span>
            <span className='text-base font-medium text-gray-500 Roboto '>Followers</span>
        </div>
      </div> {/* Following, Followers */}
    </div>
  )
}

export default ProfileInformation
