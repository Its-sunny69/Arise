import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import CreateJoinRoom from "./features/room/components/CreateJoinRoom";
import ChatRoom from "./features/room/components/ChatRoom";
import { SocketProvider } from "./context/Socket";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";
import Logout from "./features/auth/components/Logout";
import { Toaster } from "react-hot-toast";
import TaskList from "./features/todo/pages/TaskList";
import Room from "./features/room/pages/Room";
import WorldRank from "./pages/WorldRank";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Layout from "./shared/components/Layout";
import Landing from "./pages/Landing";

function App() {
  const currentToken = useSelector((state) => state.todos.token);
  const isLoggedin = !!currentToken;
  // const isLoggedin = true;

  return (
    <>
      <Toaster />
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
