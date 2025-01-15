import { forwardRef, useState } from "react";
import { useImperativeHandle } from "react";
import toast from "react-hot-toast";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import CopySvg from "../assets/copy-svg.svg";

const RoomCard = forwardRef(
  ({ room, timeAgo, handleCreatedRoomClick, handleRoomDelete }, ref) => {
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

    return (
      <>
        <div key={room._id} className="min-h-56">
          <div className="shadow-md hover:shadow-lg m-2 hover:outline hover:outline-1 hover:outline-slate-200 rounded-md hover:scale-105 transition-transform">
            <div className="bg-slate-100 p-4 rounded-t-md flex justify-between items-center">
              <p>
                <span className="font-bold">Id : </span>
                {room.roomId}
              </p>

              <button
                className="mx-2 hover:opacity-60 active:scale-95 transition-all"
                onClick={handleCopy}
              >
                <img src={CopySvg} className="w-5" />
              </button>
            </div>
            
            <div className="bg-white">
              <p className="px-4 pt-5 my-1 rounded-md">
                <span>
                  <PeopleRoundedIcon />
                </span>
                <span className="ml-3">{members}</span>
              </p>
              <p className="px-4 pb-5 my-1 rounded-md">
                <span>
                  <HistoryRoundedIcon />
                </span>
                <span className="ml-3">{timeAgo(room.createdAt)}</span>
              </p>
            </div>

            <div className=" flex justify-between rounded-b-md">
              <button
                className="w-1/2 text-black  bg-slate-100 font-bold rounded-bl-md text-sm px-4 py-3 hover:outline-dotted hover:outline-2 hover:outline-blue-500 hover:text-blue-500 active:scale-95 transition-transform hover:z-10"
                onClick={() => handleCreatedRoomClick(room.roomId)}
              >
                Join
              </button>
              <button
                className="w-1/2 text-black bg-slate-100 font-bold rounded-br-md text-sm px-4 py-2 hover:outline-dotted hover:outline-2 hover:outline-red-500 hover:text-red-500 active:scale-95 transition-transform hover:z-10"
                onClick={() => handleRoomDelete(room.roomId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default RoomCard;
