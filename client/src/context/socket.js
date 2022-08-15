import React from "react";
import socketio from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

export const socket = socketio(SOCKET_URL, {
  withCredentials: true,
});
export const SocketContext = React.createContext();
