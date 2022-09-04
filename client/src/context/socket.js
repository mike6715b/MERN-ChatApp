import React from "react";
import socketio from "socket.io-client";

const SOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "/socket"
    : "http://localhost:3000/socket";

export const socket = socketio(SOCKET_URL, {
  withCredentials: true,
});
export const SocketContext = React.createContext();
