import { createContext, useState } from "react";
//eslint-disable-next-line
export const ProfileHeaderContext = createContext();

export function ProfileHeaderProvider({ children }) {

    const [profileHeaderUrl, setProfileHeaderUrl] = useState('');
    const [previewHeader, setPreviewHeader] = useState(null);

    return (
        <ProfileHeaderContext.Provider value={{ profileHeaderUrl, setProfileHeaderUrl, previewHeader, setPreviewHeader }}>
            { children }
        </ProfileHeaderContext.Provider>
    );
}