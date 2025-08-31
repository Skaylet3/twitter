import { createContext, useContext } from "react";
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const socket3000 = io("http://localhost:3000", { withCredentials: true });
    const socket4000 = io("http://localhost:4000", {withCredentials: true});
    return(
        <SocketContext.Provider value={{ socket3000, socket4000 }} >
            { children }
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);