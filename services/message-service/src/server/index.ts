import Fastify from 'fastify';
import { registerRoutes } from '../presentation/routes';
import { ServerConfig } from '../infrastructure/config';

/**
 * Create and start Fastify server
 */
export async function createAndStartServer(config: ServerConfig): Promise<void> {

  const fastify = Fastify({
    logger: config.debug,
  });

  registerRoutes(fastify);

  await fastify.listen({ port: config.port, host: config.host });

  console.log(`[Server] Listening on http://${config.host}:${config.port}`);
}
