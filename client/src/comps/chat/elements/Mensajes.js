import { useState, useEffect } from "react";

import { io } from "socket.io-client";
const WEB = "http://localhost:3002";
const socket = io(WEB);

function Mensajes() {
  const [msg, setMsg] = useState([]);
  const [socketmsg, setSocketMsg] = useState([]);

  useEffect(() => {
    socket.emit("chat", msg);
  }, [msg]); 

  function handleSubmit(e) {
    e.preventDefault();
    const user = document.getElementById("user").value;
    const message = document.getElementById("msg").value;
    if (!(user.trim() === "" || message.trim() === "")) {
      setMsg([...socketmsg, { usr: user, msg: message }]);
    }
  } 

  socket.on("chat-broadcast", (arg) => {
    setSocketMsg(arg);
  });

  return (
    <section className="Mensajes">
      <form>
        <p>
          <label htmlFor="user">User: </label>
          <input id="user" type="text" />
        </p>
        <div id="caja">
          {socketmsg &&
            [...socketmsg].map((e) => {
              const caja = document.getElementById("caja");
              caja.scrollTop = caja.scrollHeight - caja.clientHeight; //Mantiene el scrollbar en la parte inferior de la caja.
              return (
                <p className="message" key={e.msg + "-" + socketmsg.indexOf(e)}>
                  <b>{e.usr + ": "}</b>
                  {e.msg}
                </p> 
              );
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
