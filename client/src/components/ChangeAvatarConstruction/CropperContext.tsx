import { createContext, useState, useContext } from 'react';

const CropperContext = createContext();

export const useCropper = () => useContext(CropperContext);

export const CropperProvider = ({ children }) => {
  const [cropData, setCropData] = useState({ imageSrc: null, onComplete: null });

  const openCropper = (imageSrc, onComplete) => {
    setCropData({ imageSrc, onComplete });
  };

  const closeCropper = () => {
    setCropData({ imageSrc: null, onComplete: null });
  };

  return (
    <CropperContext.Provider value={{ cropData, openCropper, closeCropper }}>
      {children}
    </CropperContext.Provider>
  );
};