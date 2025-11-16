import { IMessage } from "../messages";

export interface IMessageProducer {

  connect(): Promise<void>;

  disconnect(): Promise<void>;

  publish(args: { queue: string, message: IMessage }): Promise<void>;
}

export interface IMessageConsumer {

  connect(): Promise<void>;

  disconnect(): Promise<void>;

  consume(args: ConsumeMessageArgs): Promise<void>;
}

export interface PublishMessageArgs {
  queue: string;
  message: IMessage;
}

export interface ConsumeMessageArgs {
  queue: string;
  handler: MessageHandler;
}

export type MessageHandler = (context: MessageHandlerContext) => Promise<void>;

export interface MessageHandlerContext {
  message: IMessage;
}
