import { useState, useEffect } from "react";

import { io } from "socket.io-client";
const WEB = "http://localhost:3002";
const socket = io(WEB);

function Mensajes() {

  const [msg, setMsg] = useState([]);

  return (
    <section className="Mensajes">
      <p>
        <label htmlFor="user">User: </label>
        <input id="user" type="text" />
      </p>
      <div></div>
      <p>
        <input id="msg" type="text" placeholder="Enter message" />
        <button>Send</button>
      </p>
    </section>
  );
}

export default Mensajes;
