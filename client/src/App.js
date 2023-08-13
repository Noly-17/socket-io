import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");

  const [newMessage, setNewMessage] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  const sendMessage = () => {
    socket.emit("send_message", {
      message,
      room,
    });
  };
  useEffect(() => {
    socket.on("received_message", (data) => {
      setNewMessage(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <div>
        <input
          placeholder="Room..."
          onChange={(e) => setRoom(e.target.value)}
        />
        <button type="button" onClick={joinRoom}>
          Join
        </button>
      </div>
      <div>
        <input
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="button" onClick={sendMessage}>
          Send
        </button>
      </div>
      <div>{newMessage}</div>
    </div>
  );
}

export default App;
