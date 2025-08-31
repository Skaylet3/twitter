import React from 'react'
import ProfileHeader from '../ChangeHeaderConstruction/ProfileHeader/ProfileHeader'
import ProfileInformation from '../ProfileInformation/ProfileInformation'
import ProfileSwitcher from '../ProfileSwitcher/ProfileSwitcher'
import ProfileAvatar from '../ChangeAvatarConstruction/ProfileAvatar/ProfileAvatar'

const ProfileInfo = () => {
    
  return (
    <div className="w-full h-auto relative " >
      <div className="w-[145px] aspect-[1/1] bg-gray-400 absolute top-[122px] ml-3 z-21 rounded-full border-4 border-white overflow-hidden " >
        <ProfileAvatar />
      </div>
      <div className=" w-full h-[200px] " >
        <ProfileHeader />
      </div>  
      <ProfileInformation />
      <ProfileSwitcher />
      <div className="flex flex-col h-auto w-full box-border">

      </div>
    </div>
  )
}

export default ProfileInfo
