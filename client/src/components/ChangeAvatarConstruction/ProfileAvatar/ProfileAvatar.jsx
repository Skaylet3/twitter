import { useContext, useEffect } from 'react'
import { UserContext } from '../../../context/UserContext';
import { SocketContext } from '../../../context/SocketContext';

const ProfileAvatar = () => {

    //sockets
    const { socket4000 } = useContext(SocketContext);
  
    //using 4000 port socket
        useEffect(() => {
          socket4000.on("mediaReady", () => {
          setAvatarUser(prev => `${prev}?refresh=${Date.now()}`);
          });
    
          return () => socket4000.off("mediaReady");
        }, []);

  const { avatarUser, setAvatarUser } = useContext(UserContext);

  return (
    <div className="w-full aspect-[1/1] bg-gray-900 rounded-full z-1000 overflow-hidden " >
        {avatarUser && <img src={avatarUser} className="w-auto  h-full object-cover " />}
    </div>  
  )
}

export default ProfileAvatar
