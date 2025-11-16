import Cropper from 'react-easy-crop';
import { useState, useRef } from 'react';

function AvatarEditor({ imageSrc, onCropCompleteCallback, onCancel }) {
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
        console.log("dataaab: ", data);
        return data.key;
    };

  const handleApply = async () => {
    if (!croppedAreaPixels || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imageSrc;

    await image.decode();

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.beginPath();
    ctx.arc(
      croppedAreaPixels.width / 2,
      croppedAreaPixels.height / 2,
      croppedAreaPixels.width / 2,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.clip();

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
      const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });
      const imageUrl = await uploadImage(file);
      console.log("image url: ", imageUrl);
      onCropCompleteCallback(imageUrl);
    }, 'image/jpeg');
  };

  return (
    <div className="relative w-full h-[400px] bg-black rounded-xl overflow-hidden">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1/1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        cropShape="round"
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

export default AvatarEditor;