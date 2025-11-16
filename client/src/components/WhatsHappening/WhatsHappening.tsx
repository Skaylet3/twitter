import React, { useContext } from 'react'
import "./WhatsHappening.css";
import { useEffect } from 'react';
import ReusableFormForPosts from '../ReusableFormForPosts/ReusableFormForPosts';
import { UserContext } from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';

const WhatsHappening = ({ onCreate, onImageChange, image, content, divRef, onWriting }) => {

  //sockets
  const { socket4000 } = useContext(SocketContext);

  //using 4000 port socket
      useEffect(() => {
        socket4000.on("mediaReady", () => {
        setAvatarUser(prev => `${prev}?refresh=${Date.now()}`);
        });
  
        return () => socket4000.off("mediaReady");
      }, []);

  //avatar's state
  const { setAvatarUser } = useContext(UserContext);
  const { getUser } = useContext(UserContext);

  useEffect(() =>  {
		getUser();
  }, []);

  return (
    <ReusableFormForPosts 
      placeholder={"What's happening"}
      buttonText={'Post'}
      content={content}
      image={image}
      onCreate={onCreate}
      onImageChange={onImageChange}
      onWriting={onWriting}
      ref={divRef}
    />
  )
}

export default WhatsHappening
