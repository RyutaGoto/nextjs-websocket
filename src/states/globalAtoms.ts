import { atom } from "jotai";
import { Socket } from "socket.io-client";
import Message from "@/models/message";

// 状態：WebSocketコネクション
export const socketAtom = atom(null as unknown as Socket);
// 状態：メッセージ一覧
export const messageBoardAtom = atom<Array<Message>>([]);
// 状態：ユーザー名
export const userNameAtom = atom("");
