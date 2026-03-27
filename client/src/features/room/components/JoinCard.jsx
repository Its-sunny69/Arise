import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Admin, Clock, Copy, Leave, Logout, People } from "@/assets/icons";

const JoinCard = forwardRef(
  ({ room, userId, handleJoinRoomClick, timeAgo, handleLeaveRoom }, ref) => {
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

    if (userId === room.createdBy) {
      return null;
    }

    return (
      <div key={room._id} className="">
        <div className="m-1 transition-transform duration-300 will-change-transform hover:scale-105 sm:m-2">
          <div className="card-bg relative -z-10 flex min-h-64 min-w-72 flex-col overflow-hidden rounded-xl border-2 border-white shadow-[0px_0px_14px_6px_#ffffff3b] backdrop-blur-lg">
            <div className="absolute inset-0 -z-[5] rounded-xl bg-gradient-to-t from-white to-transparent"></div>

            <div className="flex items-center justify-between border-b-2 border-white p-2">
              <p className="rounded-lg bg-neutral-200 px-2 py-1 text-sm font-bold">
                <span>Id : </span>
                {room.roomId}
              </p>

              <button
                className="rounded-lg p-2 transition-all hover:bg-neutral-200 active:scale-95"
                onClick={handleCopy}
              >
                <img src={Copy} alt="Copy" className="w-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-start justify-center gap-1 p-4">
              <p className="my-1 flex items-center gap-4 font-bold">
                <img src={Admin} alt="Admin" className="w-7" />
                <span>{room.users[0]?.username}</span>
              </p>
              <p className="my-1 flex items-center gap-4">
                <img src={People} alt="People" className="w-7" />
                <span>{members}</span>
              </p>
              <p className="my-1 flex items-center gap-4">
                <img src={Clock} alt="Clock" className="w-7" />
                <span>{timeAgo(room.createdAt)}</span>
              </p>
            </div>

            <div className="flex w-full items-center justify-between rounded-b-md">
              <button
                className="m-2 flex-1 rounded-xl bg-black px-4 py-3 text-sm font-bold text-white shadow-[0px_0px_14px_6px_#ffffff1f] transition-all hover:z-10 hover:text-blue-500 hover:opacity-95 hover:outline-dotted hover:outline-2 hover:outline-offset-2 hover:outline-blue-400 active:scale-95"
                onClick={() => handleJoinRoomClick(room.roomId)}
              >
                Join
              </button>
              <button
                className="m-2 ml-0 rounded-xl p-2 transition-all hover:z-10 hover:bg-red-100 active:scale-95"
                onClick={() => handleLeaveRoom(room.roomId)}
              >
                <img src={Leave} alt="Leave" className="w-7" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

JoinCard.displayName = "JoinCard";

JoinCard.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    roomId: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  handleJoinRoomClick: PropTypes.func.isRequired,
  handleLeaveRoom: PropTypes.func.isRequired,
  timeAgo: PropTypes.func.isRequired,
};

export default JoinCard;
