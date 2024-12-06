import { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast"; // Optional, but recommended for error notifications

export const SocketContext = createContext();

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketContextProvider");
  }
  return context;
};

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { authUser } = useContext(AuthContext);
  const socketRef = useRef(null);

  let url="http://localhost:5001"

  useEffect(() => {
    // Cleanup function to ensure socket is properly closed
    const cleanupSocket = (socketInstance) => {
      if (socketInstance) {
        socketInstance.off("getOnlineUsers");
        socketInstance.off("connect");
        socketInstance.off("disconnect");
        socketInstance.off("connect_error");
        socketInstance.close();
      }
    };

    // Only attempt socket connection if authenticated
    if (authUser && !socketRef.current) {
      try {
        const newSocket = io(`${url}`, {
          query: { userId: authUser._id },
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        // Store socket reference
        socketRef.current = newSocket;
        setSocket(newSocket);

        // Connection success handler
        newSocket.on("connect", () => {
          console.log("Socket connected successfully");
          setIsConnected(true);
        });

        // Online users handler
        newSocket.on("getOnlineUsers", (users) => {
          console.log("Online users updated:", users);
          setOnlineUsers(users);
        });

        // Connection error handler
        newSocket.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
          toast.error("Failed to connect to real-time server");
          setIsConnected(false);
        });

        // Disconnection handler
        newSocket.on("disconnect", (reason) => {
          console.warn("Socket disconnected:", reason);
          setIsConnected(false);

          // Optionally, attempt reconnection
          if (reason !== "io client disconnect") {
            newSocket.connect();
          }
        });

        return () => {
          cleanupSocket(newSocket);
          socketRef.current = null;
          setSocket(null);
        };

      } catch (error) {
        console.error("Error initializing socket:", error);
        toast.error("Could not establish real-time connection");
      }
    } 
    // Cleanup socket when user logs out
    else if (!authUser && socketRef.current) {
      cleanupSocket(socketRef.current);
      socketRef.current = null;
      setSocket(null);
    }
  }, [authUser]);

  // Debugging utility: Log online users changes
  useEffect(() => {
    console.log("Current online users:", onlineUsers);
  }, [onlineUsers]);

  return (
    <SocketContext.Provider 
      value={{ 
        socket: socketRef.current, 
        onlineUsers, 
        isConnected,
        url
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};