import Message from "@/models/message";
import {
  messageBoardAtom,
  socketAtom,
  userNameAtom,
} from "@/states/globalAtoms";
import { useAtom } from "jotai";
import { FormEventHandler, useState } from "react";

export default function MessageList() {
  const [message, setMessage] = useState<string>("");
  const [messageBoard] = useAtom(messageBoardAtom);
  const [userName] = useAtom(userNameAtom);
  const [socket] = useAtom(socketAtom);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const sendMessage: Message = {
      id: crypto.randomUUID(),
      room: 1,
      author: userName,
      body: message,
    };
    socket.emit("message", sendMessage);
    setMessage("");
  };
  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
          />
          <button>Send</button>
        </form>
      </section>
      <section>
        <ul>
          {messageBoard.map((message: Message) => (
            <li key={message.id}>
              {message.author}:{message.body}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
