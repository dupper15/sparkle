import { io } from "socket.io-client";
// Kết nối tới server Backend qua Socket.IO
const socket = io("http://localhost:5001", {
  withCredentials: true,
});

// Lắng nghe sự kiện kết nối thành công
socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

// Lắng nghe lỗi kết nối
socket.on("connect_error", (error) => {
  console.error("Connection failed:", error);
});

export default socket;
