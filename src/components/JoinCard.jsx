import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";

const JoinCard = forwardRef(
  ({ room, username, handleJoinRoomClick, timeAgo, handleLeaveRoom }, ref) => {
    const [members, setMembers] = useState(room.users.length);

    useImperativeHandle(ref, () => ({
      updateChild(newValue) {
        setMembers(newValue);
      },
    }));
    return (
      <>
        <div key={room._id} className="flex flex-wrap">
          {username !== room.createdBy ? (
            <div className="w-40 h-28 shadow-lg m-5 rounded-md">
              <p>Admin:{room.createdBy}</p>
              <p>RoomId{room.roomId}</p>
              <p className="p-4">Members:{members}</p>
              <p>Created:{timeAgo(room.createdAt)}</p>
              <div className=" flex justify-around">
                <button onClick={() => handleJoinRoomClick(room.roomId)}>
                  Join
                </button>
                <button onClick={() => handleLeaveRoom(room.roomId)}>
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
