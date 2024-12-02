import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteToken } from "../slice/todosSlice";
import { Navigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const currentToken = useSelector((state) => state.todos.token);
  const isLoggedIn = !!currentToken;

  useEffect(() => {
    dispatch(deleteToken());
  }, [isLoggedIn]);

  return <Navigate to="/login" />;
}

export default Logout;
