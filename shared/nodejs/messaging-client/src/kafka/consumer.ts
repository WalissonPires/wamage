import { Consumer, Kafka } from "kafkajs";
import { ConsumeMessageArgs, IMessageConsumer } from "@wamage/messaging-contracts/broker";
import { IMessage } from "@wamage/messaging-contracts/messages";

export class KafkaConsumer implements IMessageConsumer {

  private consumer: Consumer;

  constructor({ kafka, groupId }: { kafka: Kafka, groupId: string }) {
    this.consumer = kafka.consumer({ groupId });
  }

  public async connect(): Promise<void> {
    return this.consumer.connect();
  }

  public async disconnect(): Promise<void> {
    return this.consumer.disconnect();
  }

  public async consume({ queue, handler }: ConsumeMessageArgs): Promise<void> {
    await this.consumer.subscribe({ topic: queue, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const parsedMessage: IMessage = JSON.parse(message.value!.toString());
        await handler({ message: parsedMessage });
      },
    });
  }
}
