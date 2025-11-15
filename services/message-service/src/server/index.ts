import Fastify from "fastify";
import { SendMessageCommand } from '@wamage/message-service-contracts-ts/commands';

export function startServer() {

  const server = Fastify({
    logger: true
  });

  server.get('/', (req, res) => {

    const message: SendMessageCommand = {
      meta: {
        commandId: '1',
        trackingId: '2',
        createadAt: new Date()
      },
      user: {
         accountId: '3',
         userId: '4'
      },
      requestId: '10',
      channel: 'whatsapp',
      to: '553399002211',
      message: 'Hello World'
    };

    return message;
  });

  server.listen({
    port: Number(process.env.PORT || 5001),
    host: '0.0.0.0'
  }, (error, address) => {
    if (error) {
      console.error(error.message ?? 'Fail start server');
      process.exit(1);
    }
  });
}