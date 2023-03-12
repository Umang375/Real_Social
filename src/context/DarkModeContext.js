import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({children})=>{
    const [darkMode, setDarkMode]=useState(JSON.parse(localStorage.getItem("darkMode")) || false);

    const toggleDarkMode = () =>{
        setDarkMode(!darkMode);
    }


    useEffect(() =>{
        localStorage.setItem("darkMode", darkMode);
    },[darkMode])

    return(
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
};