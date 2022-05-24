import { useState, useEffect } from "react";

import { io } from "socket.io-client";
const WEB = "http://localhost:3002";
const socket = io(WEB);

function Mensajes() {
  const [msg, setMsg] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="Mensajes">
      <form>
        <p>
          <label htmlFor="user">User: </label>
          <input id="user" type="text" />
        </p>
        <div></div>
        <p>
          <input id="msg" type="text" placeholder="Enter message" />
          <input onClick={handleSubmit} type="submit" value="Send" />
        </p>
      </form>
    </section>
  );
}

export default Mensajes;
