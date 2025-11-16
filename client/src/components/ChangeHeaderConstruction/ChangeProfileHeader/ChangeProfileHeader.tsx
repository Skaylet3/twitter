import { React, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { useCropperHeader } from '../CropperHeaderContext'
import { ProfileHeaderContext } from '../ProfileHeaderContext'
import { MediaBaseUrlContext } from '../../../context/MediaBaseUrlContext'

const ChangeProfileHeader = () => {
  
    const { mediaBaseUrlConverter } = useContext(MediaBaseUrlContext);

    const { openCropperHeader } = useCropperHeader();
    const { setPreviewHeader } = useContext(ProfileHeaderContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      openCropperHeader(reader.result, (croppedUrl) => {
        setPreviewHeader(mediaBaseUrlConverter(croppedUrl)); // пока просто preview
      });
    };
    reader.readAsDataURL(file);
  };

  
  return (
    <div className="absolute w-full h-full rounded-full z-10">
      <label className="cursor-pointer">
        <div className="w-auto h-full bg-black opacity-[0%] hover:opacity-[70%] flex justify-center items-center transition-opacity duration-150">
          <input type="file" accept="image/*" onChange={handleFileChange} onClick={(e) => {e.target.value = null;}} className="hidden" />
          <FontAwesomeIcon icon={faCamera} className="text-white text-2xl" />
        </div>
      </label>
    </div>
  )
}

export default ChangeProfileHeader
