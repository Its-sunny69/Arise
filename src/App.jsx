import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import React from "react";
import "./App.css";
import Todo from "./components/Todo";
import Home from "./Pages/Home";
import { useSelector } from "react-redux";
import CreateJoinRoom from "./CreateJoinRoom";
import ChatRoom from "./ChatRoom";
import { SocketProvider } from "./context/Socket";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
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
            <Route path="/" element={isLoggedin ? <Home /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/join-room" element={<CreateJoinRoom />} />
            <Route path="/chat/:roomId" element={<ChatRoom />} />
            <Route path="/todo" element={<Todo />} />
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
