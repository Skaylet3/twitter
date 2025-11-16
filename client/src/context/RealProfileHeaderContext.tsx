import { createContext, useState } from "react";

export const RealProfileHeaderContext = createContext(); 

export const RealProfileHeaderProvider = ({ children }) => {
    const [realProfileHeader, setRealProfileHeader] = useState(null);

    return(
        <RealProfileHeaderContext.Provider value={{ realProfileHeader, setRealProfileHeader }}>
            { children }
        </RealProfileHeaderContext.Provider>
    );
}