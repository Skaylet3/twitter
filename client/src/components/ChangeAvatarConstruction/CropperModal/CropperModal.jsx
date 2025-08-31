import AvatarEditor from '../AvatarEditor/AvatarEditor';
import { useCropper } from '../CropperContext';

const CropperModal = () => {
  const { cropData, closeCropper } = useCropper();

  if (!cropData.imageSrc) return null;

  const handleCrop = (blobUrl) => {
    cropData.onComplete(blobUrl);
    closeCropper();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex justify-center items-center">
      <div className="bg-white p-4 rounded-xl w-[400px]">
        <AvatarEditor
          imageSrc={cropData.imageSrc}
          onCropCompleteCallback={handleCrop}
          onCancel={closeCropper}
        />
      </div>
    </div>
  );
};

export default CropperModal;