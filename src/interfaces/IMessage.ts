import { MessageType } from "../enums/MessageType";

export interface IMessage {
  type: MessageType;
  text: string;
}