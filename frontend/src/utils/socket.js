import { io } from "socket.io-client";
const socket = io("http://localhost:5001", {
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});
socket.on("connect_error", (error) => {
  console.error("Connection failed:", error);
});
socket.on("reconnect_attempt", () => {
  console.log("Attempting to reconnect...");
});

export default socket;
