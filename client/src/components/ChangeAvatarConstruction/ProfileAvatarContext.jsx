import { createContext, useState } from "react";
//eslint-disable-next-line
export const ProfileAvatarContext = createContext();

export function ProfileAvatarProvider({ children }) {

    const [profileAvatarUrl, setProfileAvatarUrl] = useState('');
    const [preview, setPreview] = useState(null);

    return (
        <ProfileAvatarContext.Provider value={{ profileAvatarUrl, setProfileAvatarUrl, preview, setPreview }}>
            { children }
        </ProfileAvatarContext.Provider>
    );
}