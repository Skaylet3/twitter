import { createContext, useState } from "react";
//eslint-disable-next-line
export const ReplyTextContext = createContext();

export function ReplyTextProvider({ children }) {

    const [replyText, setReplyText] = useState('');

    return (
        <ReplyTextContext.Provider value={{ replyText, setReplyText }}>
            { children }
        </ReplyTextContext.Provider>
    );
}