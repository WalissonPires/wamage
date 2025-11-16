import { Kafka, Producer } from "kafkajs";
import { IMessageProducer, PublishMessageArgs } from "@wamage/messaging-contracts/broker";

export class KafkaProducer implements IMessageProducer {

  private producer: Producer;

  constructor({ kafka }: { kafka: Kafka }) {
    this.producer = kafka.producer();
  }

  public async connect(): Promise<void> {
    return this.producer.connect();
  }

  public async disconnect(): Promise<void> {
    return this.producer.disconnect();
  }

  public async publish({ queue, message }: PublishMessageArgs): Promise<void> {
    await this.producer.send({
      topic: queue,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
