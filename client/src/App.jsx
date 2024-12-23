import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import CreateJoinRoom from "./pages/CreateJoinRoom";
import ChatRoom from "./pages/ChatRoom";
import { SocketProvider } from "./context/Socket";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import { Toaster } from "react-hot-toast";
import TaskList from "./pages/TaskList";
import Room from "./pages/Room";
import WorldRank from "./pages/WorldRank";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";

function App() {
  const currentToken = useSelector((state) => state.todos.token);
  const isLoggedin = !!currentToken;

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <SocketProvider>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={isLoggedin ? <Home /> : <Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/task-list" element={<TaskList />} />
              <Route path="/room" element={<Room />} />
              <Route path="/world-rank" element={<WorldRank />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/join-room" element={<CreateJoinRoom />} />
              <Route path="/chat/:roomId" element={<ChatRoom />} />
            </Route>
          </Routes>
        </SocketProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
