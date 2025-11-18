import { FastifyInstance } from 'fastify';
import { MessagesController } from '../controllers/messages.controller';

export default function registerRoutes(fastify: FastifyInstance): void {

  const controller = new MessagesController();

  fastify.post('/messages', (req, reply) => controller.sendMessage(req, reply));
}
