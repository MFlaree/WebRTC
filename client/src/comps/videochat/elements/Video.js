import { useState, useEffect } from "react";

import { io } from "socket.io-client";
const WEB = "http://localhost:3002";
const socket = io(WEB);

function Video() {
  const [streamState, setStreamState] = useState(false);
  const [intervalID, setIntervalID] = useState(false);
  const [img, setImg] = useState(false);

  useEffect(() => {
    async function callback() {
      const video = document.getElementById("video");
      const canvas = document.getElementById("canvas");

      if (streamState) {
        video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
        setIntervalID(
          setInterval(() => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
    //        canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            socket.emit("videochat", canvas.toDataURL());
          }, 500)
        );
      } else {
        if (video.srcObject !== null) {
          //Condición para que no salte un error en la inicialización.
          video.srcObject.getTracks()[0].stop();   
          setIntervalID(clearInterval(intervalID)); // !Que esta función funcione.
        }
      }
    }
    try {
      callback();
    } catch (err) {
      console.log(err);
    }
  }, [streamState]);

  socket.on("videochat", (arg) => {
    setImg(arg);
  });

  return (
    <section className="VideoChat">
      <button onClick={() => setStreamState(!streamState)}>
        {streamState ? "Stop Broadcasting" : "Start Broadcasting"}
      </button>
      <br />
      <video id="video" autoPlay></video>
      <canvas hidden id="canvas"></canvas>
      {img !== false ? (
        <img id="image" src={img} alt="bradcasting_image" />
      ) : (
        ""
      )}
    </section>
  );
}

export default Video;
