import { React, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { ProfileAvatarContext } from '../ProfileAvatarContext'
import { useCropper } from '../CropperContext'

const ChangeProfileAvatar = () => {
  
    const { openCropper } = useCropper();
    const { setPreview } = useContext(ProfileAvatarContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      openCropper(reader.result, (croppedUrl) => {
        setPreview(croppedUrl); // пока просто preview
      });
    };
    reader.readAsDataURL(file);
  };

  
  return (
    <div className="absolute w-full h-full rounded-full z-1000">
      <label className="cursor-pointer">
        <div className="w-auto h-full bg-black rounded-full opacity-[0%] hover:opacity-[70%] flex justify-center items-center transition-opacity duration-150">
          <input type="file" accept="image/*" onChange={handleFileChange} onClick={(e) => {e.target.value = null;}} className="hidden" />
          <FontAwesomeIcon icon={faCamera} className="text-white text-2xl" />
        </div>
      </label>
    </div>
  )
}

export default ChangeProfileAvatar
