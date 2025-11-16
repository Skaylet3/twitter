import React from 'react'
import { useContext } from 'react'
import { ProfileFeedContext } from '../../context/PostsSweetcherContext'

const ProfileSwitcher = () => {
  
  const { active, setActive } = useContext(ProfileFeedContext);

  return (
      <div className='w-full h-[53px] bg-black flex justify-between mt-1 border-b-1 border-gray-200 ' >
        <button className={`bg-white hover:bg-gray-200 w-full h-full flex items-center justify-center flex-col ${active === 1 ? 'pt-4' : 'pt-[4px]'} gap-2 `} onClick={() => setActive(1)} >
          <span className=' text-[#1DA1F2] Roboto font-bold text-base ' >
            Posts
          </span>
          {active === 1 && <div className='bg-[#1DA1F2] w-[50%] h-1 rounded-full  ' ></div>}
        </button>
        <button className={`bg-white hover:bg-gray-200 w-full h-full flex items-center justify-center flex-col ${active === 2 ? 'pt-4' : 'pt-[4px]'} gap-2 `} onClick={() => setActive(2)} >
          <span className='text-[#1DA1F2] Roboto font-bold text-base' >
            Replies
          </span>
            {active === 2 && <div className='bg-[#1DA1F2] w-[50%] h-1 rounded-full  ' ></div>}  
        </button>
        <button className={`bg-white hover:bg-gray-200 w-full h-full flex items-center justify-center flex-col ${active === 3 ? 'pt-4' : 'pt-[4px]'} gap-2 `} onClick={() => setActive(3)} >
          <span className=' text-[#1DA1F2] Roboto font-bold text-base' >
            Articles
          </span>
          {active === 3 && <div className='bg-[#1DA1F2] w-[50%] h-1 rounded-full  ' ></div>}
        </button>
        <button className={`bg-white hover:bg-gray-200 w-full h-full flex items-center justify-center flex-col ${active === 4 ? 'pt-4' : 'pt-[4px]'} gap-2 `} onClick={() => setActive(4)} >
          <span className='text-[#1DA1F2] Roboto font-bold text-base' >
            Media
          </span>
          {active === 4 && <div className='bg-[#1DA1F2] w-[50%] h-1 rounded-full  ' ></div>}
        </button>
        <button className={`bg-white hover:bg-gray-200 w-full h-full flex items-center justify-center flex-col ${active === 5 ? 'pt-4' : 'pt-[4px]'} gap-2 `} onClick={() => setActive(5)} >
          <span className='text-[#1DA1F2] Roboto font-bold text-base' >
            Likes
          </span>
          {active === 5 && <div className='bg-[#1DA1F2] w-[50%] h-1 rounded-full  ' ></div>}
        </button>
      </div>
  )
}

export default ProfileSwitcher
