import { FastifyInstance } from 'fastify';
import registerMessageRoutes from './messages.routes';

export function registerRoutes(fastify: FastifyInstance): void {
  registerMessageRoutes(fastify);
}
