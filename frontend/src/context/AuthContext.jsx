import { Children, createContext, useState } from "react";

export const AuthContext=createContext();

const [authUser,setAuthUser]=useState(JSON.parse(localStorage.getItem("chat-user")) || null)

export const AuthContextProvider=({children})=>{
    return <AuthContext.Provider value={{authUser,setAuthUser}} >
        {children}
    </AuthContext.Provider>
}