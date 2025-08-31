import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ReusableNavBarNoArrow = ({ menuName }) => {
  return (
    <div className='w-full flex pl-3 pt-3 pb-3 ' >  
      <span className=' text-2xl Roboto font-bold text-[#1DA1F2] ' >
        {menuName}
      </span>
    </div>
  )
}

export default ReusableNavBarNoArrow
