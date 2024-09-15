import { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket,setSocket]=useState(null)
    const { authUser } = useContext(AuthContext);
    const socketRef = useRef(null);

    useEffect(() => {
        if (authUser && !socketRef.current) {
            const socket = io("http://localhost:5001" , {
                query: { userId: authUser._id },
                
            });
            socketRef.current = socket;
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => {
                socket.off("getOnlineUsers");
                socket.close();
                socketRef.current = null;
            };
        } else if (!authUser && socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
