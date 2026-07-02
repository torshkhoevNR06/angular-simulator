import { MessageType } from "../enum/MessageType";

export interface IMessage {
  type: MessageType;
  text: string;
}