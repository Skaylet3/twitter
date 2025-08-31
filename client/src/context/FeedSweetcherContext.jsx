import { createContext, useState } from "react";
//eslint-disable-next-line
export const FeedContext = createContext();

export function FeedProvider({ children }) {
    const [feedSwitcher, setFeedSwitcher] = useState(true);
    return (
        <FeedContext.Provider value={{ feedSwitcher, setFeedSwitcher }}>
            { children }
        </FeedContext.Provider>
    );
}