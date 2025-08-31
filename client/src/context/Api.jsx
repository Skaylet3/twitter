import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
          const res = await fetch('http://localhost:3000/api/auth/check-auth', {
            credentials: 'include'  
          });
          if (!res.ok) throw new Error('Unauthorized!');
        } catch {
          navigate('/Login', { replace: true });
        }
  }

    return(
        <ApiContext.Provider value={{ checkAuth }} >
            { children }
        </ApiContext.Provider>
    );
}