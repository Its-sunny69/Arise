import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext); // This is now inside a function, which is correct
};

export const SocketProvider = ({ children }) => {
  const socket = io("http://localhost:3001");

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
