import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser]=useState(JSON.parse(localStorage.getItem("user")) || null);
    const login = async (inputs) =>{  
       const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/login`, inputs, {
              withCredentials: true,
        });
        setCurrentUser(res.data);
    };


    useEffect(() =>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser]);

    return(
        <AuthContext.Provider value={{currentUser, login}}>
            {children}
        </AuthContext.Provider>
    )
};