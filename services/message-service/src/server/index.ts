import Fastify from "fastify";
import { IMessage } from '@wamage/message-contracts-ts';

export function startServer() {

  const server = Fastify({
    logger: true
  });

  server.get('/', (req, res) => {

    const message: IMessage = {
      id: '1',
      text: 'Hello, world!',
      timestamp: new Date(),
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