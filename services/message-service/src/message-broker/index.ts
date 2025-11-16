import { MessageBrokerFactory } from "@wamage/messaging-client";
import { IMessageConsumer, IMessageProducer } from "@wamage/messaging-contracts/broker";

export class MessageBrokerService {

  private static _instance: MessageBrokerService;

  public static get instance() {
    return this._instance || (this._instance = new this());
  }


  private _producer: IMessageProducer;
  private _consumer: IMessageConsumer;


  constructor() {
    const brokerfactory = new MessageBrokerFactory({
      kafkaAddress: process.env.KAFKA_ADDRESS ?? 'localhost:9092',
      kafkaClientId: 'message-service'
    });

    this._producer = brokerfactory.createProducer();
    this._consumer = brokerfactory.createConsumer({ groupId: 'message-service'});
  }

  public async init() {
    await this._producer.connect();
    await this._consumer.connect();
  }

  public async dispose() {
    await this._producer.disconnect();
    await this._consumer.disconnect();
  }

  public get producer() {
    return this._producer;
  }

  public get consumer() {
    return this._consumer;
  }
}

export const MessageBrokerQueues = {
  sendMessageQueue: 'send-message'
};