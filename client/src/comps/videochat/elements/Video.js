import { useState } from 'react';

import { io } from 'socket.io-client';
const WEB = "http://localhost:3002";
const socket = io(WEB);

function Video() {

  const [streamState, setStreamState] = useState(false);
  let error = useState(false);

  async function toggleVideo() {   
    try {

      const video = document.getElementById("video");
      const canvas = document.getElementById("canvas");

      if (streamState) {
        video.srcObject.getTracks()[0].stop();

      } else {
        video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });

        setInterval(() => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        }, 40);
        
      }
      
      setStreamState(!streamState);

    } catch (err) {
      error = err;
      console.log(error);
    }
    
  }

  return (
    <section className='VideoChat'>
      <button onClick={toggleVideo}>Start Broadcasting</button>
      <br/>
      <video id="video" autoPlay></video>
      <canvas id="canvas"></canvas>
    </section>
    
  );
}

export default Video;
