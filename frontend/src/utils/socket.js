import { io } from "socket.io-client";
const socket = io("http://localhost:5001", {
  withCredentials: true,
});
socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});
socket.on("connect_error", (error) => {
  console.error("Connection failed:", error);
});

export default socket;
