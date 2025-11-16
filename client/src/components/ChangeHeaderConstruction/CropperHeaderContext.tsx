import { createContext, useState, useContext } from 'react';

const CropperHeaderContext = createContext();

export const useCropperHeader = () => useContext(CropperHeaderContext);

export const CropperHeaderProvider = ({ children }) => {
  const [cropDataHeader, setCropHeaderData] = useState({ imageSrc: null, onComplete: null });

  const openCropperHeader = (imageSrc, onComplete) => {
    setCropHeaderData({ imageSrc, onComplete });
  };

  const closeCropperHeader = () => {
    setCropHeaderData({ imageSrc: null, onComplete: null });
  };

  return (
    <CropperHeaderContext.Provider value={{ cropDataHeader, openCropperHeader, closeCropperHeader }}>
      {children}
    </CropperHeaderContext.Provider>
  );
};