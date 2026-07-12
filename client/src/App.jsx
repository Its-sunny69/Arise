import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SocketProvider } from "./context/Socket";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Landing from "./pages/Landing";
import { fetchUser } from "./features/auth/authSlice";
import SEO from "./shared/components/SEO";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import Layout from "./shared/components/Layout";
import PageLoading from "./shared/components/PageLoading";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";
import RoomLayout from "./features/room/Layout/RoomLayout";

const Home = lazy(() => import("./pages/Home"));
const CreateJoinRoom = lazy(
  () => import("./features/room/pages/CreateJoinRoom"),
);
const ChatRoom = lazy(() => import("./features/room/pages/ChatRoom"));
const TaskList = lazy(() => import("./features/todo/pages/TaskList"));
const Room = lazy(() => import("./features/room/pages/Room"));
const WorldRank = lazy(() => import("./pages/WorldRank"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));

function App() {
  const dispatch = useDispatch();
  const { token, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user && loading !== "pending") {
      dispatch(fetchUser(token));
    }
  }, [dispatch, token, user, loading]);

  return (
    <>
      <Toaster />
      <SEO />
      <SocketProvider>
        <Suspense fallback={<PageLoading />}>
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
        </Suspense>
      </SocketProvider>
    </>
  );
}

export default App;
