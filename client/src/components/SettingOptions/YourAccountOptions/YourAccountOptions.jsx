import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import React from 'react'

const YourAccountOptions = () => {
  return (
    <div className='border-r-1 border-gray-200 h-full w-full ' >
      <div className="w-full ml-3 pt-3 mb-5 " >
        <span className='text-2xl Roboto font-bold text-[#1DA1F2] ' >
          Your account
        </span>
      </div>  
      <div className='w-full flex justify-center items-center mb-4  ' >
        <span className='text-gray-400 text-[12px] font-medium ml-3 ' >
            See information about your account, download an archive of your data, or learn about your account deactivation options
        </span>
      </div>
      <NavLink to='../account-information' className="w-full  hover:bg-gray-100 flex pb-5 pt-5 flex-row justify-between items-center relative cursor-pointer select-none " >
            <div className='ml-4 flex flex-col ' >
              <span className='text-[17px] font-medium text-[#1DA1F2] ' >
                Account information
              </span>
              <span className='text-gray-400 text-[13px] font-medium ' >
                See your account information like your phone number and email adress.
              </span>
            </div>  
            <div className='mr-5 ' >
              <FontAwesomeIcon icon={faAngleRight} className='text-[16px] text-gray-400 ' />
            </div>
      </NavLink>
      <NavLink to='../deactivate' className="w-full  hover:bg-gray-100 flex pb-5 pt-5 flex-row justify-between items-center relative cursor-pointer select-none " >
            <div className='ml-4 flex flex-col ' >
              <span className='text-[17px] font-medium text-[#1DA1F2] ' >
                Deactivate your account
              </span>
              <span className='text-gray-400 text-[13px] font-medium ' >
                Find out how you can deactivate your account.
              </span>
            </div>  
            <div className='mr-5 ' >
              <FontAwesomeIcon icon={faAngleRight} className='text-[16px] text-gray-400 ' />
            </div>
      </NavLink>
    </div>
  )
}

export default YourAccountOptions
