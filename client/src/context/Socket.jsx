import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = io("http://localhost:3002");

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
