import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "../slice/todosSlice";
import { useSocket } from "../context/Socket";

function WorldRank() {
  const [userId, setUserId] = useState();
  const [ranking, setRanking] = useState([]);
  const [point, setPoint] = useState();
  const currentToken = useSelector((state) => state.todos.token);
  const dispatch = useDispatch();
  const socket = useSocket();

  const userAuth = async () => {
    // console.log("currentToken", currentToken);

    dispatch(AuthUser(currentToken)).then((response) => {
      if (response.payload) {
        setUsername(response.payload.username);
        setUserId(response.payload._id);
        setPoint(response.payload.points);
      }
    });
  };

  useEffect(() => {
    userAuth();
  }, []);

  useEffect(() => {
    socket.on("pointsSocket", (pointsData) => {
      console.log("pointsData", pointsData);
      const sortedRank = pointsData.sort((a, b) => b.points - a.points);
      setRanking(sortedRank);
    });

    // socket.emit("refresh", userId);

    return () => {
      socket.off("pointsSocket");
      // socket.off("refresh");
    };
  }, [socket, userId]);

  useEffect(() => {
    handlePoints();
  }, []);

  const handlePoints = () => {
    socket.emit("points");
  };
  console.log("point", point);

  return (
    <div className=" border-2 border-black m-2 p-2">
      <p>World Rankings</p>
      <br />
      {ranking.map((user, index) => {
        return (
          <>
            <ol>
              <li key={user._id}>
                {index + 1}.{user.username}:{user.points}
              </li>
            </ol>
          </>
        );
      })}
    </div>
  );
}

export default WorldRank;
