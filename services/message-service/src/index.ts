import { createAndStartServer } from './server';
import { createMessageBrokerConfig, createServerConfig } from './infrastructure/config';
import { MessageBrokerService } from './infrastructure/messaging/service';
import { MessageBrokerConsumerHandler } from './infrastructure/messaging/consumers';

async function main() {
  try {
    const serverConfig = createServerConfig();
    const messageBrokerConfig = createMessageBrokerConfig();
    console.log('[Bootstrap] Configuration loaded', { serverConfig, messageBrokerConfig });

    MessageBrokerService.init(messageBrokerConfig);
    const messageBroker = MessageBrokerService.getInstance();
    await messageBroker.connect();
    console.log('[Bootstrap] Message broker connected');

    const consumerHandler = new MessageBrokerConsumerHandler(messageBroker);
    consumerHandler.init();

    await createAndStartServer(serverConfig);
    console.log('[Bootstrap] Application started successfully');

    process.on('SIGTERM', handleShutdown);
    process.on('SIGINT', handleShutdown);

    async function handleShutdown() {
      console.log('[Bootstrap] Shutting down...');
      await messageBroker.disconnect();
      console.log('[Bootstrap] Goodbye');
      process.exit(0);
    }
  } catch (error) {
    console.error('[Bootstrap] Fatal error:', error);
    process.exit(1);
  }
}

// Start application
main().catch((error) => {
  console.error('[Bootstrap] Unhandled error:', error);
  process.exit(1);
});