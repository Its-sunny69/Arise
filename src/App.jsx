import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Todo from "./Todo";
import CreateJoinRoom from "./CreateJoinRoom";
import ChatRoom from "./ChatRoom";
import { SocketProvider } from "./context/Socket";
function App() {
  return (
    <>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<CreateJoinRoom />} />
            <Route path="/chat/:roomId" element={<ChatRoom />} />
          </Routes>
        </Router>
      </SocketProvider>
    </>
  );
}

export default App;
