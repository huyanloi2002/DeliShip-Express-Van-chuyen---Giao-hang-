import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TYPES } from "./redux/actions/actionTypes";
import audioNoti from "./assets/audio_noti.mp3";

const SocketClient = () => {
  const dispatch = useDispatch();
  const { auth, socket, notify } = useSelector((state) => state);
  const prevUserIdRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (auth.userId && auth.userId !== prevUserIdRef.current) {
      socket.emit("joinUser", auth.userId);
      prevUserIdRef.current = auth.userId;
    }
  }, [socket, auth.userId]);

  useEffect(() => {
    socket.on("createNotifyToClient", (msg) => {
      dispatch({ type: TYPES.CREATE_NOTIFIES, payload: msg });
      if (notify.sound) {
        audioRef.current.play();
      }
    });
    return () => socket.off("createNotifyToClient");
  }, [socket, dispatch, notify]);

  useEffect(() => {
    socket.on("removeNotifyToClient", (msg) => {
      dispatch({ type: TYPES.REMOVE_NOTIFIES, payload: msg });
    });
    return () => socket.off("removeNotifyToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("updateStatusToClient", (msg) => {
      dispatch({ type: TYPES.UPDATE_ORDER_USER, payload: msg });
      dispatch({ type: TYPES.UPDATE_ORDER_ID, payload: msg });
    });
    return () => socket.off("updateStatusToClient");
  }, [socket, dispatch]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audioNoti} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;
