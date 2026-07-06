import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../context/Socket";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import GradientButton from "@/shared/components/GradientButton";
import { GirlInChatRoom, GirlJoiningChat } from "@/assets/images";
import "@/shared/styles/CSS/common.css";

const CreateJoinRoom = () => {
  const socket = useSocket();
  const [input, setInput] = useState({ joinRoom: "" });
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);

  const profile = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    socket.on("join-msg", (data) => {
      if (data.error) {
        toast.error(data.error, {
          position: "top-center",
        });
      } else {
        toast.success("Joined Room Successfully", {
          position: "top-center",
        });

        navigate(`/room/chat/${data.roomId}`, {
          state: { userName: data.userName },
        });
      }
    });

    return () => {
      socket.off("join-msg");
    };
  }, [navigate]);

  const handleCreateRoom = (e) => {
    e.preventDefault();
    socket.emit("create-room", profile);
    socket.on("msg", (val) => {
      navigate(`/room/chat/${val.id}`);
    });
    setInput({ ...input, userName: "", joinRoom: "" });
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", profile, input.joinRoom);
  };

  return (
    <div className="relative">
      <div className="my-10 grid grid-cols-1 gap-y-4 lg:grid-cols-7 lg:gap-4">
        <div className="col-span-1 flex flex-col items-start justify-center lg:col-span-4">
          <p className="text-cente font-title text-3xl font-bold md:text-4xl lg:text-6xl">
            Create,
            <br />A <span className="gradient-animated-text">New</span> Room
          </p>
          <p className="text-cente mt-6">
            Create a room to collaborate And organize tasks with your team.
            Share the room code with others to join.
          </p>

          <div className="z-10 mt-20 flex items-center justify-start sm:mt-24">
            <GradientButton text="Create New Room" onClick={handleCreateRoom} />
          </div>
        </div>

        <div className="pointer-events-none col-span-1 flex items-center justify-center lg:col-span-3 lg:justify-end">
          <img
            src={GirlInChatRoom}
            alt="Girl in Chat Room"
            className="h-auto w-72"
          />
        </div>
      </div>

      <div className="my-20 grid grid-cols-1 gap-y-4 lg:grid-cols-7 lg:gap-4">
        <div className="pointer-events-none order-1 col-span-1 flex items-center justify-center lg:col-span-3 lg:justify-start">
          <img
            src={GirlJoiningChat}
            alt="Girl Joining Chat"
            className="h-auto w-72"
          />
        </div>

        <div className="col-span-1 flex flex-col items-start justify-center lg:order-1 lg:col-span-4">
          <p className="font-title text-3xl font-bold md:text-4xl lg:text-6xl">
            Join,
            <br />
            An <span className="gradient-animated-text">Existing</span> Room
          </p>
          <p className="mt-6">
            Already have a room code?
            <br />
            Enter it below to collaborate with your team.
          </p>

          <div className="z-10 mt-20 flex items-center justify-start sm:mt-24">
            <div className="flex w-full gap-2 rounded-full border-2 border-white bg-white/40 py-2 pl-4 pr-2 shadow-[0px_0px_14px_6px_#ffffff1f] transition-all focus-within:outline-dotted focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-gray-400">
              <input
                type="text"
                className="w-full bg-transparent outline-none"
                placeholder="Enter Room ID"
                name="joinRoom"
                onChange={handleInput}
                value={input.joinRoom}
              />

              <button
                className="flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:opacity-70 active:scale-95"
                type="submit"
                onClick={handleJoinRoom}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJoinRoom;
