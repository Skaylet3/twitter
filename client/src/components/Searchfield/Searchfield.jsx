import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {useState } from 'react'

const Searchfield = () => {

  const [outputField, showOutputField] = useState(true);

  const switchOutput = () => {

    showOutputField(!outputField);
  }
  const switchOutput2 = () => {

    showOutputField(!outputField);
  }

  return (
  <div className="w-[100%] h-[100%] flex flex-col items-end px-5 border-l-1 border-gray-200 " >
    <div className=" w-full rounded-full mt-1.5 h-11 border border-gray-200 relative">
      <input onFocus={switchOutput} onBlur={switchOutput2 } placeholder="Search" className="text-sm text-gray-700 placeholder-gray-700 font-semibold Roboto w-full h-[100%] rounded-full focus:ring-[#1DA1F2] focus:ring-2 focus:outline-none caret-[#1DA1F2] pl-9 pb-0.5"/>
      <FontAwesomeIcon className="text-gray-400 text-base absolute left-3 top-3" icon={faMagnifyingGlass} />
    </div>
    {!outputField && <div className="w-full  h-[75%] shadow-2xl " >
        <div className="border-b box-border border-gray-200 w-[100%] h-[30%] flex flex-col" >
          <div className="w-full h-[33%] flex flex-row gap-1 justify-start pl-5 items-center" >
            <FontAwesomeIcon className="text-[#1DA1F2] text-2xl" icon={faMagnifyingGlass} />
            <span className="text-gray-700 Roboto font-semibold text-sm ml-4" >Zoldyck</span>
            <span className="text-gray-400 Roboto font-semibold text-sm" >Killua</span>
          </div>
         <div className="w-full h-[33%] flex flex-row gap-1 justify-start pl-5 items-center" >
            <FontAwesomeIcon className="text-[#1DA1F2] text-2xl" icon={faMagnifyingGlass} />
            <span className="text-gray-700 Roboto font-semibold text-sm ml-4" >Zoldyck</span>
            <span className="text-gray-400 Roboto font-semibold text-sm" >Silva</span>
          </div>
          <div className="w-full h-[33%] flex flex-row gap-1 justify-start pl-5 items-center" >
            <FontAwesomeIcon className="text-[#1DA1F2] text-2xl" icon={faMagnifyingGlass} />
            <span className="text-gray-700 Roboto font-semibold text-sm ml-4" >Zoldyck</span>
            <span className="text-gray-400 Roboto font-semibold text-sm" >Kikyo</span>
          </div>
        </div>
        <div className=" w-[100%] h-[70%] pt-5 pb-5 flex flex-col gap-5 overflow-y-auto overflow-x-hidden" >
          
        </div>
      </div>}
  </div>
  )
}

export default Searchfield
