import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import React from "react";
import "./App.css";
import Todo from "./Todo";
import { useSelector } from "react-redux";
import CreateJoinRoom from "./CreateJoinRoom";
import ChatRoom from "./ChatRoom";
import { SocketProvider } from "./context/Socket";

import Login from "./Login";
import SignUp from "./SignUp";
import Logout from "./Pages/Logout";
import { Toaster } from "react-hot-toast";

function App() {
  const currentToken = useSelector((state) => state.todos.token);
  const isLoggedin = !!currentToken;

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <SocketProvider>
          <Routes>
            <Route path="/" element={isLoggedin ? <Todo /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/join-room" element={<CreateJoinRoom />} />
            <Route path="/chat/:roomId" element={<ChatRoom />} />
          </Routes>
        </SocketProvider>
      </BrowserRouter>
      {/*       
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
      </SocketProvider> */}
    </>
  );
}

export default App;
