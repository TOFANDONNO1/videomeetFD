import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../providers/Socket";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { socket } = useSocket();
  //   socket.emit("join-room", { roomId: "1", emailId: "random@example.com" });
  const [email, setEmail] = useState();
  const [roomId, setRoomId] = useState();
  const navigate=useNavigate();
  const handleJoinRoom = () => {
    socket.emit("join-room", { emailId: email, roomId });
  };

  const handleRoomJoined = useCallback(({ roomId }) => {
    console.log("RoomJoined", roomId);
    navigate(`/room/${roomId}`);
  },[navigate]);
  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);
    return()=>{
        socket.off('joined-room',handleRoomJoined);

    }
  }, [socket,handleRoomJoined]);
  return (
    <div>
      <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          type="text"
          placeholder=" Room Code"
        />
        <button onClick={handleJoinRoom}>Enter</button>
      </div>
    </div>
  );
};

export default Home;
