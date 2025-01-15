import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();



export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = io(import.meta.env.VITE_SERVER_URL);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
