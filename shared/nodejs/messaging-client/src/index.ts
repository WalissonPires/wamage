import { Kafka } from "kafkajs";
import { IMessageConsumer, IMessageProducer } from "@wamage/messaging-contracts/broker";
import { KafkaProducer } from "./kafka/producer";
import { KafkaConsumer } from "./kafka/consumer";

export interface MessageBrokerConfig {
  kafkaAddress: string;
  kafkaClientId: string;
}

export class MessageBrokerFactory {

  private kafka: Kafka;

  constructor({ kafkaAddress, kafkaClientId }: MessageBrokerConfig) {
    this.kafka = new Kafka({
      clientId: kafkaClientId,
      brokers: kafkaAddress.split(","),
    });
  }

  public createProducer(): IMessageProducer {
    return new KafkaProducer({ kafka: this.kafka });
  }

  public createConsumer(args: { groupId: string }): IMessageConsumer {
    return new KafkaConsumer({ kafka: this.kafka, groupId: args.groupId });
  }
}