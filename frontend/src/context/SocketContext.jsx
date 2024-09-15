import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'
import { AuthContext } from "./AuthContext";


export const SocketContext =createContext()

export const SocketContextProvider=({children})=>{
    const [socket,setSocket]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const {authUser}=useContext(AuthContext)

    
    useEffect(()=>{
        if(authUser){
            const socket=io("http://loacalhost:5001",{
                query:{
                    userId:authUser._id
                }
            })
            setSocket(socket)
            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            })
            return()=>socket.close()
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }

    })
    return(
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}