import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";
import ReactPlayer from "react-player";
export const Room = () => {
  const { socket } = useSocket();
  const { peer, CreateOffer, createAnswer, setRemoteAns, sendStream ,remoteStream} =
    usePeer();
  const [myStream, setMyStream] = useState(null);
  
  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log("New user joined room: " + emailId);
      const offer = await CreateOffer();
      socket.emit("call-user", { emailId, offer });
    },
    [CreateOffer, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log("Incoming call from user: " + from, offer);
      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { emailId: from, ans });
    },
    [createAnswer, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("Call Got Accepted", ans);

      await setRemoteAns(ans);
    },
    [setRemoteAns]
  );

  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
   
    setMyStream(stream);
  }, []);

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incomming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incomming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [handleCallAccepted, handleIncomingCall, handleNewUserJoined, socket]);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);
  return (
    <div>
      <h1>Room Page</h1>
      <button onClick={(e)=> sendStream(myStream)}>Send My Video</button>
      <ReactPlayer url={myStream} playing />
      <ReactPlayer url={remoteStream} playing />

    </div>
  );
};
