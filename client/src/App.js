import './App.css';
import React from 'react';

import Chat from './comps/chat/Chat';
import VideoChat from './comps/videochat/VideoChat';

function App() {

  return (
    <main>
      <h1>WebRTC-VideoChat</h1>
      <VideoChat />
      <h1>WebRTC-Chat</h1>
      <Chat />
    </main>
  );
}

export default App;
