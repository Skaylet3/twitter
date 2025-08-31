import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navigate, useNavigate } from 'react-router-dom'
import React from 'react'

const ReusableNavBar = ({ menuName }) => {

  //navigation state
  const navigate = useNavigate();

  return (
    <div className='w-full flex pl-3 pt-3 pb-3 ' >
      <div onClick={() => navigate(-1)} className='self-center transition-colors duration-300 hover:bg-gray-100 rounded-full w-[35px] aspect-[1/1] flex justify-center items-center ' > 
        <FontAwesomeIcon icon={faArrowLeft} className='text-[15px] text-gray-400 ' />
      </div>  
      <span className=' ml-10 text-2xl Roboto font-bold text-[#1DA1F2] ' >
        {menuName}
      </span>
    </div>
  )
}

export default ReusableNavBar
