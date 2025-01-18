import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/Socket";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "../slice/todosSlice";
import toast from "react-hot-toast";
import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";
import RemoteMeetingSvg from "../assets/remote-meeting.svg";
import MeetTheTeam from "../assets/meet-the-team.svg";
import ShinyText from "../components/ShinyText";

const CreateJoinRoom = () => {
  const socket = useSocket();
  const [input, setInput] = useState({ joinRoom: "" });
  const [profile, setProfile] = useState();
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);

  const dispatch = useDispatch();
  const currentToken = useSelector((state) => state.todos.token);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  dispatch(AuthUser(currentToken)).then((response) => {
    if (response.payload) {
      setProfile(response.payload._id);
    }
  });

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

        navigate(`/chat/${data.roomId}`, {
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
      navigate(`/chat/${val.id}`);
    });
    setInput({ ...input, userName: "", joinRoom: "" });
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", profile, input.joinRoom);
  };

  return (
    <>
      <div className=" p-2">
        <div className="my-4">
          <div className="w-fit  px-5 py-1 rounded-full border border-gray-400 text-sm">
            <ShinyText
              text=" 👥 | Create Or Join Room"
              disabled={false}
              speed={3}
              className=""
            />
          </div>
        </div>

        <div className="my-10 flex mx-5">
          <div className="sm:w-1/2 flex flex-col">
            <div className="title sm:text-5xl text-4xl flex sm:justify-start justify-center items-center">
              <TypeAnimation
                sequence={["Start New Room"]}
                speed={30}
                repeat={0}
                cursor={false}
              />
            </div>

            <Fade
              delay={200}
              duration={1000}
              triggerOnce
              fraction={0.5}
              className=""
            >
              {phoneView ? (
                <div className=" text-lg  text-justify mt-8">
                  Create a room to collaborate And organize tasks with your
                  team. Share the room code with others to join.
                </div>
              ) : (
                <div className="text-xl text-left mt-8">
                  Create a room to collaborate <br />
                  And organize tasks with your team.
                  <br />
                  Share the room code with others to join.
                </div>
              )}

              <div className="sm:mt-16 mt-10 flex sm:justify-start justify-center items-center ">
                <button
                  className="font-thin group transition-all active:scale-95 border border-black py-1 px-3 hover:border-dotted shadow-lg rounded-sm"
                  onClick={handleCreateRoom}
                >
                  <div className="flex justify-center items-center font-medium group-hover:text-gray-600 gap-2 transition-all">
                    Create New Room
                  </div>
                  <hr className="w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-black" />
                </button>
              </div>
            </Fade>
          </div>
          {phoneView ? (
            ""
          ) : (
            <div className="w-1/2 flex justify-center items-center">
              <img src={RemoteMeetingSvg} alt="image" className="w-[70%]" />
            </div>
          )}
        </div>

        <div className="mb-14 sm:mt-20 mt-16  flex mx-5">
          {phoneView ? (
            ""
          ) : (
            <div className="w-1/2 flex justify-center items-center">
              <img src={MeetTheTeam} alt="image" className="w-[70%]" />
            </div>
          )}
          <div className="sm:w-1/2">
            <div className="title sm:text-5xl text-4xl flex sm:justify-start justify-center items-center">
              <TypeAnimation
                sequence={["Enter a Room"]}
                speed={30}
                repeat={0}
                cursor={false}
              />
            </div>

            <Fade
              delay={200}
              duration={1000}
              triggerOnce
              fraction={0.5}
              className=""
            >
              {phoneView ? <div className="text-lg text-justify mt-8">
                Already have a room code?
                Enter it below to collaborate with your team.
              </div> : <div className="text-xl text-left mt-8">
                Already have a room code?
                <br />
                Enter it below to collaborate with your team.
              </div>}
              

              <div className="sm:mt-16 mt-10 flex sm:justify-start justify-center items-center ">
                <div className="w-72 flex justify-center items-cente">
                  <div className="w-5/6 flex justify-center items-center">
                    <input
                      type="text"
                      className="w-full px-4 py-1 border-black rounded-tl-lg text-gray-800 focus:outline-dotted focus:bg-slate-100 bg-slate-50"
                      placeholder="Enter Room ID"
                      name="joinRoom"
                      onChange={handleInput}
                      value={input.joinRoom}
                    />
                  </div>
                  <div className="w-1/6 flex justify-center items-center">
                    <button
                      className="w-full flex items-center bg-black text-sm font-medium text-white rounded-tr-lg justify-center px-4 py-[6px] hover:opacity-70 shadow-sm active:scale-95 transition-all"
                      onClick={handleJoinRoom}
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJoinRoom;
