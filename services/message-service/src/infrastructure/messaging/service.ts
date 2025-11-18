import { MessageBrokerFactory } from '@wamage/messaging-client';
import { IMessageConsumer, IMessageProducer } from '@wamage/messaging-contracts/broker';

export interface MessageBrokerServiceOptions {
  kafkaAddress: string;
  kafkaClientId: string;
  kafkaGroupId: string;
}

export class MessageBrokerService {
  private static _instance: MessageBrokerService;

  private _producer: IMessageProducer;
  private _consumer: IMessageConsumer;
  private _isConnected = false;

  public get isConnected(): boolean {
    return this._isConnected;
  }

  private constructor({ kafkaAddress, kafkaClientId, kafkaGroupId}: MessageBrokerServiceOptions) {
    const brokerFactory = new MessageBrokerFactory({
      kafkaAddress,
      kafkaClientId,
    });

    this._producer = brokerFactory.createProducer();
    this._consumer = brokerFactory.createConsumer({
      groupId: kafkaGroupId,
    });
  }

  public static init(MessageBrokerOptions: MessageBrokerServiceOptions) {
    if (!this._instance) {
      this._instance = new this(MessageBrokerOptions);
    }
  }


  public static getInstance(): MessageBrokerService {
    if (!this._instance) {
      throw new Error('MessageBrokerService not initialized');
    }
    return this._instance;
  }

  public async connect(): Promise<void> {
    if (this._isConnected) return;

    console.log('[MessageBrokerService] Connecting...');

    await this._producer.connect();
    await this._consumer.connect();
    this._isConnected = true;

    console.log('[MessageBrokerService] Connected');
  }

  public async disconnect(): Promise<void> {
    if (!this._isConnected) return;

    console.log('[MessageBrokerService] Disconnecting...');

    await this._producer.disconnect();
    await this._consumer.disconnect();
    this._isConnected = false;

    console.log('[MessageBrokerService] Disconnected');
  }

  public getProducer(): IMessageProducer {
    return this._producer;
  }

  public getConsumer(): IMessageConsumer {
    return this._consumer;
  }
}

export const MessageBrokerQueues = {
  sendMessage: 'send-message',
  messageDelivered: 'message-delivered',
  MessageDeliveryFailed: 'message-delivery-failed',
  messageReceived: 'message-received',
};
