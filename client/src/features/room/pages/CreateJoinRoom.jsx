import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../context/Socket";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";
import RemoteMeetingSvg from "../../../assets/remote-meeting.svg";
import MeetTheTeam from "../../../assets/meet-the-team.svg";
import ShinyText from "../../../shared/components/ShinyText";
import GradientButton from "@/shared/components/GradientButton";
import { GirlInChatRoom, GirlJoiningChat } from "@/assets/images";

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
  // work here.........
  return (
    <div className="gradient-bg relative h-full overflow-y-auto rounded-xl border-2 border-white px-6">
      <div className="my-20 sm:my-10">
        <div className="w-fit rounded-full border border-gray-400 px-5 py-1 text-sm">
          <ShinyText
            text=" 👥 | Create Or Join Room"
            disabled={false}
            speed={3}
            className=""
          />
        </div>
      </div>

      <div className="my-20 grid grid-cols-7 gap-4 border border-black sm:my-10">
        <div className="col-span-4 flex flex-col items-start justify-center">
          <p className="text-cente font-title text-3xl font-bold sm:text-6xl">
            Create,
            <br />A New Room
          </p>
          <p className="text-cente mt-6">
            Create a room to collaborate And organize tasks with your team.
            Share the room code with others to join.
          </p>

          <div className="z-10 mt-20 flex items-center justify-start sm:mt-24">
            <GradientButton text="Create New Room" onClick={handleCreateRoom} />
          </div>
        </div>

        <div className="pointer-events-none col-span-3">
          <img
            src={GirlInChatRoom}
            alt="Girl in Chat Room"
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="my-20 grid grid-cols-7 gap-4 border border-black sm:my-10">
        <div className="pointer-events-none col-span-3">
          <img src={GirlJoiningChat} alt="Girl Joining Chat" className="h-full w-full" />
        </div>

        <div className="col-span-4 flex flex-col items-start justify-center">
          <p className="text-cente font-title text-3xl font-bold sm:text-6xl">
            Join,
            <br />
            An Existing Room
          </p>
          <p className="text-cente mt-6">
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
