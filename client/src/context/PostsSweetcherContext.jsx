import { createContext, useState } from "react";
//eslint-disable-next-line
export const ProfileFeedContext = createContext();

export function ProfileFeedProvider({ children }) {

    const [active, setActive] = useState(1);

    return (
        <ProfileFeedContext.Provider value={{ active, setActive }}>
            { children }
        </ProfileFeedContext.Provider>
    );
}