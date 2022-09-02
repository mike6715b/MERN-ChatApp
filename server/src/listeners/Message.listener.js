class MessageListener {}

export default MessageListener;

// Najblizi primjer sto sam nasao
// https://betterprogramming.pub/socket-io-and-nextjs-build-real-time-chat-application-part-1-976555ecba

//=== Staviti u index.js ===
// const onConnection = (socket) => {
//     messageHandler(io, socket);
//   };

//   Define actions inside
//   io.on("connection", onConnection);

//=== Staviti u Message.listener.js ===
// export default (io, socket) => {
//     const createdMessage = (msg) => {
//       socket.broadcast.emit("newIncomingMessage", msg);
//     };

//     socket.on("createdMessage", createdMessage);
//   };
