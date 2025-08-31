import React from 'react'
import { useContext } from 'react'
import { FeedContext } from '/src/context/FeedSweetcherContext'

const Switcher = () => {

  const { feedSwitcher, setFeedSwitcher } = useContext(FeedContext);

  const switcFeed = () => {

    setFeedSwitcher(!feedSwitcher);
  }

  

  return (
    <div className="w-[100%] h-[100%] flex border-b border-gray-200 flex-col transition-all " >
      <div className="w-[100%] h-[50%] flex flex-row justify-center items-center  [@media(min-width:500px)]:hidden " >
        <div className=" h-8.5 w-8.5 flex justify-center items-center box-border">
            <img src="./src/assets/Logo.png" className="h-auto w-[100%]"/>
        </div>
      </div>
      <div className="w-[100%] h-[50%] flex flex-row [@media(min-width:500px)]:h-full " >
        <div className="w-[50%] h-[100%] flex flex-col relative justify-center items-center " >
          <button className={`w-[100%] h-[100%] text-base font-semibold bg-white hover:bg-gray-200 ${feedSwitcher ? 'text-black' : 'text-gray-500'} ${feedSwitcher ? 'font-extrabold' : 'font-semibold'}`}  onClick={switcFeed} disabled={feedSwitcher} >
            For you
          </button>
          {feedSwitcher && <div className="w-12 rounded-full h-1 bg-[#1DA1F2] absolute bottom-0 " ></div>}
          </div>
        <div className="w-[50%] h-[100%] flex flex-col relative justify-center items-center " >
          <button  className={`w-[100%] h-[100%] text-base font-semibold bg-white hover:bg-gray-200 ${!feedSwitcher ? 'text-black' : 'text-gray-500'} ${feedSwitcher ? 'font-extrabold' : 'font-semibold'}`}  onClick={switcFeed} disabled={!feedSwitcher} >
            Following
          </button>
          {!feedSwitcher && <div className="w-12 rounded-full h-1 bg-[#1DA1F2] absolute bottom-0 " ></div>}
        </div>
      </div>
    </div>
  )
}


export default Switcher
