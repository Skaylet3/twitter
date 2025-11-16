import { createContext, useState } from "react";

export const RealProfileAvatarContext = createContext(); 

export const RealProfileAvatarProvider = ({ children }) => {
    const [realProfileAvatar, setRealProfileAvatar] = useState(null);

    return(
        <RealProfileAvatarContext.Provider value={{ realProfileAvatar, setRealProfileAvatar }}>
            { children }
        </RealProfileAvatarContext.Provider>
    );
}