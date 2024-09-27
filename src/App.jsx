import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Todo from "./Todo";
import CreateJoinRoom from "./CreateJoinRoom";
import ChatRoom from "./ChatRoom";
import { SocketProvider } from "./context/Socket";import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Logout from "./Pages/Logout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
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
