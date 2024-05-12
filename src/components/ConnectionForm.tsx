import Message from "@/models/message";
import {
  messageBoardAtom,
  socketAtom,
  userNameAtom,
} from "@/states/globalAtoms";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { ChangeEventHandler, FormEventHandler } from "react";
import { io } from "socket.io-client";

export default function ConnectionForm() {
  const [userName, setUserName] = useAtom(userNameAtom);
  const [, setMessageBoard] = useAtom(messageBoardAtom);
  const [, setSocket] = useAtom(socketAtom);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:3000/api/sockets", { method: "POST" });
    const socket = io({ autoConnect: false });
    socket.connect();
    socketInitializer(socket);
    setSocket(socket);
    router.push("/rooms");
  };

  const socketInitializer = (socket: any) => {
    socket.on("connect", () => {
      console.log("Connected to the server");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });
    socket.on("message", (newMessage: Message) => {
      setMessageBoard((messageBoard) => {
        const newMessageBoard = Array.from(
          new Map(messageBoard.map((message) => [message.id, message])).values()
        );
        newMessageBoard.push(newMessage);
        return newMessageBoard;
      });
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="enter your name"
          value={userName}
          onChange={handleChange}
          autoComplete="off"
        />
        <button>Connect</button>
      </form>
    </>
  );
}
