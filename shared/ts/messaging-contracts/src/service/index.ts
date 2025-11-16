import { IMessage } from "../messages";

export interface IMessagingService {
  publishMessage(message: IMessage): Promise<void>;
}