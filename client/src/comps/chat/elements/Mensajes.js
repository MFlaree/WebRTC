import { useState, useEffect } from "react";

import { io } from "socket.io-client";
const WEB = "http://localhost:3002";
const socket = io(WEB);

function Mensajes() {
  const [msg, setMsg] = useState([]);
  const [socketmsg, setSocketMsg] = useState([])

  useEffect(() => {
    socket.emit("chat", msg );
  }, [msg]);

  function handleSubmit(e) {
    e.preventDefault();
    setMsg([...msg, {usr: document.getElementById("user").value, msg: document.getElementById("msg").value } ])
    //console.log(msg);
  }

  socket.on("chat-broadcast",(arg) => {
    setSocketMsg(arg);    
  })

  return (
    <section className="Mensajes">
      <form>
        <p>
          <label htmlFor="user">User: </label>
          <input id="user" type="text" />
        </p>
        <div id="caja">
          {socketmsg && socketmsg.map(e => {
            return (
              <p key={e.msg}><b>{e.usr+": "}</b>{e.msg}</p>
            )
          })}
        </div>
        <p>
          <input id="msg" type="text" placeholder="Enter message" />
          <input onClick={handleSubmit} type="submit" value="Send" />
        </p>
      </form>
    </section>
  );
}

export default Mensajes;
