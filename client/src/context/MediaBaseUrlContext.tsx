import { createContext } from "react";
//eslint-disable-next-line
export const MediaBaseUrlContext = createContext();

export function MediaBaseUrlProvider({ children }) {
    const mediaBaseUrlConverter = (key) => {
        const mediaBaseUrl = "http://localhost:4000/uploads";

        return `${mediaBaseUrl}/${key}`;
    }

    return (
        <MediaBaseUrlContext.Provider value={{ mediaBaseUrlConverter, }}>
            { children }
        </MediaBaseUrlContext.Provider>
    );
}