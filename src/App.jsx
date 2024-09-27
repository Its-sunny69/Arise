import React from "react";
import "./App.css";
import Todo from "./Todo";
import { Route, BrowserRouter, Routes } from "react-router-dom";
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
    </>
  );
}

export default App;
