import { useState, useEffect } from "react";

import { io } from "socket.io-client";
const WEB = "http://localhost:3002";
const socket = io(WEB);

function Video() {
  const [streamState, setStreamState] = useState(false);

  useEffect(() => {
    async function callback() {
      const video = document.getElementById("video");
      const canvas = document.getElementById("canvas");
      let interval;
      if (streamState) {
        video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
        // !Cambiar dibujar por enviar imagen al servidor
        interval = setInterval(() => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          socket.emit("videochat","AYAYA");
        }, 40);
      } else {
        if (video.srcObject !== null) {     //Condición para que no salte un error en la inicialización.
          video.srcObject.getTracks()[0].stop();
          clearInterval(interval);    // !Que esta función funcione.
        }
      }
    }
    try {
      callback();
    } catch (err) {
      console.log(err);
    }
  }, [streamState]);

  return (
    <section className="VideoChat">
      <button onClick={() => setStreamState(!streamState)}>Start Broadcasting</button>
      <br />
      <video id="video" autoPlay></video>
      <canvas id="canvas"></canvas>
    </section>
  );
}

export default Video;
