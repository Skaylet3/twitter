import { useCropperHeader } from '../CropperHeaderContext';
import HeaderEditor from '../HeaderEditor/HeaderEditor';
const CropperHeaderModal = () => {
  const { cropDataHeader, closeCropperHeader } = useCropperHeader();

  if (!cropDataHeader.imageSrc) return null;

  const handleCrop = (blobUrl) => {
    cropDataHeader.onComplete(blobUrl);
    closeCropperHeader();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex justify-center items-center">
      <div className="bg-white p-4 rounded-xl w-[400px]">
        <HeaderEditor
          imageSrc={cropDataHeader.imageSrc}
          onCropCompleteCallbackHeader={handleCrop}
          onCancel={closeCropperHeader}
        />
      </div>
    </div>
  );
};

export default CropperHeaderModal;