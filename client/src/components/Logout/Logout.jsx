import { React } from 'react'

const Logout = ({ username}) => {

  const logOut = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      const data = await res.json();
      console.log("Logging out res: ", data);
    } catch(err) {
      console.error("Error while logout: ", err.message);
    }
  };

  return (
    <div className='fixed left-[320px] bottom-[83px] w-[300px] flex flex-col ' >
      <div className=' flex-col bg-white pt-3 pb-3 shadow-[0_6px_15px_rgba(0,0,0,0.25)] rounded-2xl' >
        <div className='w-full pl-4 p-1 bg-transparent hover:bg-gray-100 ' >
            <span className=' text-[14px] Segoe font-bold ' >
                Add an existing account
            </span>
        </div>
        <div className='w-full pl-4 p-1 bg-transparent hover:bg-gray-100 ' >
            <span className=' text-[14px] Segoe font-bold ' onClick={logOut} >
                Log out @{username}
            </span>
        </div>
      </div>
      <div className='flex justify-center ' >
        <div className='w-0 h-0 
            border-l-[10px] border-l-transparent 
            border-r-[10px] border-r-transparent 
            border-t-[10px] border-t-white ' >

        </div>
      </div>
    </div>
  )
}

export default Logout
