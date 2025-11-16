import { IMessage } from "../messages";

export interface IMessagingService {
  publishMessage(args: PublishMessageArgs): Promise<void>;
}

export interface PublishMessageArgs {
  queue: string;
  message: IMessage;
}