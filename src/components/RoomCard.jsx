import { forwardRef, useState } from "react";
import { useImperativeHandle } from "react";
const RoomCard = forwardRef(
  ({ room, timeAgo, handleCreatedRoomClick, handleRoomDelete }, ref) => {
    const [members, setMembers] = useState(room.users.length);

    useImperativeHandle(ref, () => ({
      updateChild(newValue) {
        setMembers(newValue);
      },
    }));

    return (
      <>
        <div key={room._id} className="flex flex-wrap">
          <div className="w-40 h-28 shadow-lg m-5 rounded-md">
            <p>RoomId{room.roomId}</p>
            <p className="p-4">Members:{members}</p>
            <p>Created:{timeAgo(room.createdAt)}</p>
            <div className=" flex justify-around">
              <button onClick={() => handleCreatedRoomClick(room.roomId)}>
                Join
              </button>
              <button onClick={() => handleRoomDelete(room.roomId)}>
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
