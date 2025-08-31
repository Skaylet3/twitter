import { useContext, useEffect } from 'react'
import { UserContext } from '../../../context/UserContext';
import { SocketContext } from '../../../context/SocketContext';

const ProfileHeader = () => {

    //sockets
    const { socket4000 } = useContext(SocketContext);
  
    //using 4000 port socket
        useEffect(() => {
          socket4000.on("mediaReady", () => {
          setHeaderUser(prev => `${prev}?refresh=${Date.now()}`);
          });
    
          return () => socket4000.off("mediaReady");
        }, []);

  const { headerUser, setHeaderUser } = useContext(UserContext);

  return (
  <div className="w-full aspect-[15/5] bg-gray-600 z-20 " >  
    {headerUser && <img src={headerUser} className='w-full h-full object-cover ' />}
  </div>  
  )
}

export default ProfileHeader
