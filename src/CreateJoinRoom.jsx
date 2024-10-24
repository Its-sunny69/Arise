import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./context/Socket";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "./features/todosSlice";
const CreateJoinRoom = () => {
  const socket = useSocket();
  const [input, setInput] = useState({ joinRoom: "" });
  const [profile, setProfile] = useState();
  const dispatch = useDispatch();
  const currentToken = useSelector((state) => state.todos.token);
  const navigate = useNavigate();

  dispatch(AuthUser(currentToken)).then((response) => {
    if (response.payload) {
      setProfile(response.payload.username);
    }
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    socket.on("join-msg", (data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(`${data.userName} joined room: ${data.roomId}`);

        navigate(`/chat/${data.roomId}`, {
          state: { userName: data.userName },
        });
      }
    });

    return () => {
      socket.off("join-msg");
    };
  }, [socket, navigate]);

  const handleCreateRoom = (e) => {
    e.preventDefault();
    socket.emit("create-room", profile);
    socket.on("msg", (val) => {
      console.log(val.user + " created Room with RoomID " + val.id);
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
      <div className="border-2 border-black m-2 p-2">
        <div className="flex justify-center items-center">
          <div className="w-[80%] flex justify-center items-center mb-5 bg-slate-100 rounded-md shadow-sm">
            <div className="my-2 font-bold text-xl tracking-wider">
              <h1>Welcome To Arise</h1>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-[80%] flex justify-center items-center my-5 bg-slate-100 rounded-md">
            <form
              action=""
              className="w-[80%] my-8 flex flex-col justify-center items-center"
            >
              <div className="flex flex-col justify-center items-center">
                <p className="font-semibold tracking-wider my-4">Create New Room</p>
                <button
                  onClick={handleCreateRoom}
                  className="w-fit px-4 py-2 mx-4 rounded-lg group bg-gradient-to-br from-blue-500 to-purple-400 text-sm font-medium text-white hover:scale-105 hover:opacity-70 transition-all duration-200"
                >
                  Create Room
                </button>
              </div>

              <hr className="my-8 h-[2px] w-full rounded-sm bg-gradient-to-br from-red-500 to-orange-400" />

              <div className="flex flex-col justify-center items-center">
                <p className="font-semibold tracking-wider my-4">Join Room</p>
                <div className="w-[100%] justify-center flex items-center rounded-md shadow-sm">
                  <div className="w-[80%] ">
                    <input
                      className="w-full px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
                      type="text"
                      placeholder="Enter Room ID"
                      name="joinRoom"
                      onChange={handleInput}
                      value={input.joinRoom}
                    />
                  </div>

                  <div className="w-[20%] flex justify-center items-center hover:opacity-60">
                    <button
                      onClick={handleJoinRoom}
                      className="w-full flex items-center bg-gradient-to-br from-blue-500 to-purple-400 text-sm font-medium text-white rounded-r-lg justify-center py-2 hover:scale-105 hover:opacity-70 transition-all duration-200"
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>

              {/* <input
                type="text"
                placeholder="Enter Room ID"
                name="joinRoom"
                onChange={handleInput}
                value={input.joinRoom}
              />
              <button onClick={handleJoinRoom}>Join Room</button> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJoinRoom;
