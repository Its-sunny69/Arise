import { forwardRef, useImperativeHandle, useState } from "react";
import toast from "react-hot-toast";
import CopySvg from "../assets/copy-svg.svg";

const JoinCard = forwardRef(
  ({ room, username, handleJoinRoomClick, timeAgo, handleLeaveRoom }, ref) => {
    const [members, setMembers] = useState(room.users.length);

    useImperativeHandle(ref, () => ({
      updateChild(newValue, id) {
        if (room.roomId == id) {
          setMembers(newValue);
        }
      },
    }));

    const handleCopy = () => {
      navigator.clipboard
        .writeText(room.roomId)
        .then(() => {
          toast.success("ID copied to clipboard!", {
            position: "top-center",
          });
        })
        .catch((error) => {
          console.error("Failed to copy text: ", error);
        });
    };

    // console.log("JoinCard", members);

    return (
      <>
        <div key={room._id} className="flex flex-wrap">
          {username !== room.users[0].username ? (
            <div className="shadow-lg m-5 rounded-md">
              <div className="bg-slate-300 px-4 py-2 rounded-t-md">
                <p>Admin: {room.users[0].username}</p>
                <div className="flex">
                  <p>RoomId: {room.roomId}</p>
                  <button className="mx-2" onClick={handleCopy}>
                    <img src={CopySvg} className="w-4" />
                  </button>
                </div>
              </div>
              <p className="px-4 pt-5 rounded-md">Members:{members}</p>
              <p className="px-4 pb-5 rounded-md">
                Created:{timeAgo(room.createdAt)}
              </p>
              <div className=" flex justify-between rounded-b-md">
                <button
                  className="w-1/2 text-black border-r bg-slate-300 hover:bg-blue-400 focus:ring-1 focus:ring-blue-300 font-medium rounded-bl-md text-sm px-4 py-2 focus:outline-none"
                  onClick={() => handleJoinRoomClick(room.roomId)}
                >
                  Join
                </button>
                <button
                  className="w-1/2 focus:outline-none text-black border-l bg-slate-300 hover:bg-red-400 focus:ring-1 focus:ring-red-300 font-medium rounded-br-md text-sm px-4 py-2"
                  onClick={() => handleLeaveRoom(room.roomId)}
                >
                  Leave
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }
);

export default JoinCard;
