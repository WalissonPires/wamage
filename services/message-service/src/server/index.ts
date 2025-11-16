import Fastify from "fastify";
import { MessageBrokerQueues, MessageBrokerService } from "../message-broker";
import { CommandsFactory } from "../commands";

export function startServer() {

  const server = Fastify({
    logger: true
  });

  server.get('/', async (req, res) => {
    return { message: 'OK' };
  });

  server.post('/messages', async (req, res) => {

    const { channel, to, message } = (req.body ?? {}) as any;

    const sendMessageCommand = CommandsFactory.createSendMessageCommand({ channel, to, message });

    const producer = MessageBrokerService.instance.producer;

    await producer.publish({
      queue: MessageBrokerQueues.sendMessageQueue,
      message: sendMessageCommand
    });

    return { message };
  });

  server.listen({
    port: Number(process.env.PORT || 5001),
    host: '0.0.0.0'
  }, (error) => {
    if (error) {
      console.error(error.message ?? 'Fail start server');
      process.exit(1);
    }
  });
}