import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";
const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};
export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("https://videomeet-26z5.onrender.com", {
    path: "/socket.io", // Ensure this matches the server's path
    transports: ["websocket", "polling"], // Ensure the transport methods are supported
  }), []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
