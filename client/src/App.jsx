import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import CreateJoinRoom from "./features/room/pages/CreateJoinRoom";
import ChatRoom from "./features/room/pages/ChatRoom";
import { SocketProvider } from "./context/Socket";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";
import { Toaster } from "react-hot-toast";
import TaskList from "./features/todo/pages/TaskList";
import Room from "./features/room/pages/Room";
import RoomLayout from "./features/room/Layout/RoomLayout";
import WorldRank from "./pages/WorldRank";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Layout from "./shared/components/Layout";
import Landing from "./pages/Landing";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import { fetchUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { token, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user && loading === "idle") {
      dispatch(fetchUser(token));
    }
    // console.log("App - user:", user);
  }, [dispatch, token, user, loading]);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <SocketProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/task-list" element={<TaskList />} />
                <Route path="/room" element={<RoomLayout />}>
                  <Route index element={<Room />} />
                  <Route path="create-join" element={<CreateJoinRoom />} />
                  <Route path="chat/:roomId" element={<ChatRoom />} />
                </Route>
                <Route path="/world-rank" element={<WorldRank />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/contactus" element={<ContactUs />} />
              </Route>
            </Route>
          </Routes>
        </SocketProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
