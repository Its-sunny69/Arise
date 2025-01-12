import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
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
import StarsBackground from "./components/StarsBackground";
import Landing from "./pages/Landing";

function App() {
  const currentToken = useSelector((state) => state.todos.token);
  const isLoggedin = !!currentToken;

  return (
    <>
      <Toaster />
      {/* <StarsBackground/> */}
      <BrowserRouter>
        <SocketProvider>
          <Routes>
            <Route
              path="/"
              element={!isLoggedin ? <Landing /> : <Navigate to="/home" />}
            />
            <Route
              path="/login"
              element={!isLoggedin ? <Login /> : <Navigate to="/home" />}
            />
            <Route
              path="/signup"
              element={!isLoggedin ? <SignUp /> : <Navigate to="/home" />}
            />
            <Route
              path="/"
              element={isLoggedin ? <Layout /> : <Navigate to="/login" />}
            >
              <Route path="/home" element={<Home />} />
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
