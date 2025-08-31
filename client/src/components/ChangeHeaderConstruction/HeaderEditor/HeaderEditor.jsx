import Cropper from 'react-easy-crop';
import { useState, useRef } from 'react';
import { MediaBaseUrlContext } from '../../../context/MediaBaseUrlContext';
import { useContext } from 'react';

function HeaderEditor({ imageSrc, onCropCompleteCallbackHeader, onCancel }) {
  const canvasRef = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        console.log("file", file);

        const res = await fetch('http://localhost:4000/upload', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });

        const data = await res.json();
        return data.key;   
    };

        const { mediaBaseUrlConverter } = useContext(MediaBaseUrlContext);
    

  const handleApply = async () => {
    console.log('✅ Apply нажата');
    if (!croppedAreaPixels || !canvasRef.current) return;

    if (!croppedAreaPixels || !canvasRef.current) {
    console.warn('⚠️ Нет данных для кропа');
    return;
  }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imageSrc;

    await image.decode();

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], 'croppedHeader.jpg', { type: 'image/jpeg' });
      const imageUrl = await uploadImage(file);
      console.log("header url: ", imageUrl);
      onCropCompleteCallbackHeader(imageUrl);
    }, 'image/jpeg');
  };

  return (
    <div className="relative w-full h-[400px] bg-black overflow-hidden">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={15 / 5}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        cropShape="square"
        showGrid={false}
      />

      <canvas ref={canvasRef} className="hidden" />

      <div className="absolute bottom-4 w-full flex justify-center gap-4 items-center px-4">
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-[150px]"
        />
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default HeaderEditor;