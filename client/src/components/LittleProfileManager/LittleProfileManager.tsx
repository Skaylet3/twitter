import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

//<div className='w-full flex flex-col  bg-amber-800 ' >
   //     <div className="w-full h-18 flex items-center justify-between" >
    //      <div className='w-[40px] h-[40px] rounded-full overflow-hidden ' >
    //        {avatar && <img src={avatar} className="w-auto h-full object-contain " />}
    //      </div>
     //     <div className='w-[142px] h-[48px] flex flex-col justify-center ' >
     //       <span className='Roboto text-black font-semibold text-[13px] truncate ' >
     //         {nickname}
        //    </span>
        //    <span className='Roboto text-gray-400 font-semibold text-[13px] ' >
        //      @{username}
         //   </span>
       //   </div>
       //   <div className='w-[48px] h-[48px] flex items-center ' >
          //  <FontAwesomeIcon className="text-black text-xl " icon={faEllipsis} />
       //   </div>
     //   </div>
    //  </div>

const LittleProfileManager = ({ avatar, nickname, username, options }) => {

  return (
    <div className='w-full h-auto flex flex-row justify-between p-2  border-r-6 border-l-6 border-t-3 border-b-3 border-transparent bg-transparent transition-all duration-200 hover:border-gray-200 hover:bg-gray-200 rounded-full ' >
      <div className=' h-[45px] w-[45px] rounded-full overflow-hidden' >
        <img src={avatar} className='object-cover w-full h-full ' />
      </div>
      <div className='flex flex-col mr-5 ' >
        <span className='Roboto text-gray-900 font-bold text-[15px] truncate ' >{nickname}</span>
        <span className='Roboto text-gray-400 font-bold text-[15px] ' >@{username}</span>
      </div>
      <div className=' flex flex-col justify-center ' >
        <FontAwesomeIcon icon={faEllipsis} className='text-gray-900 text-lg ' onClick={options} />
      </div>
    </div>
  )
}

export default LittleProfileManager
